import { notFound } from "next/navigation"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import { ProductDetailContent } from "@/components/ProductDetailContent"

async function getProduct(slug: string) {
    await dbConnect();
    const product = await Product.findOne({ slug, isPublished: true }).lean();
    if (!product) return null;

    return {
        ...product,
        id: product.slug, // Use slug as ID
        _id: product._id.toString(),
        category: product.category?.toString() || '',
        images: product.images || [],
        description: product.description || '',
        currency: 'SAR',
        features: product.features || [],
        specifications: product.specifications || {},
        inStock: product.stock > 0
    };
}

async function getRelatedProducts(category: string, currentProductId: string) {
    await dbConnect();
    // Simple logic: fetch 4 products from same category or random
    const products = await Product.find({
        slug: { $ne: currentProductId },
        isPublished: true
    }).limit(4).lean();

    return products.map(p => ({
        ...p,
        id: p.slug,
        _id: p._id.toString(),
        category: p.category?.toString() || '',
        images: p.images || [],
        description: p.description || '',
        currency: 'SAR',
        features: p.features || [],
        specifications: p.specifications || {},
        inStock: p.stock > 0
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);
    if (!product) return { title: 'Product Not Found' };

    // Fallback image if none
    const mainImage = product.images?.[0] || 'https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png';

    return {
        title: `${product.name} | Kiswa Store`,
        description: product.description.substring(0, 160),
        keywords: [product.name, product.category, "prayer mat", "islamic gift", "kiswa store"],
        openGraph: {
            title: `${product.name} | Kiswa Premium Islamic Lifestyle`,
            description: product.description.substring(0, 200),
            url: `https://www.kiswastore.com/products/${product.id}`,
            images: [
                {
                    url: mainImage,
                    width: 800,
                    height: 800,
                    alt: product.name,
                }
            ],
            type: 'website',
        },
    };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    const relatedProducts = await getRelatedProducts(product.category, id);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.images,
        "description": product.description,
        "sku": product.id,
        "brand": {
            "@type": "Brand",
            "name": "Kiswa"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://www.kiswastore.com/products/${product.id}`,
            "priceCurrency": "SAR",
            "price": product.price,
            "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductDetailContent product={product} relatedProducts={relatedProducts} />
        </>
    );
}
