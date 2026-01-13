import { Suspense } from "react"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import { ProductsGrid } from "@/components/ProductsGrid"

import Category from "@/models/Category"

async function getProducts() {
    await dbConnect();

    // Fetch all categories for manual lookup
    const categories = await Category.find({}).lean();
    const categoryMap = new Map(categories.map((c: any) => [c._id.toString(), c]));

    // Fetch products without populate to avoid CastError on legacy data
    const products = await Product.find({ isPublished: true }).lean();

    return products.map((p: any) => {
        let categoryName = 'Uncategorized';
        let categoryId = null;

        // Manual Population Logic
        if (p.category) {
            // Case 1: p.category is an ObjectId (or string that looks like one)
            // We check if it exists in our category map
            const catIdString = p.category.toString();
            if (categoryMap.has(catIdString)) {
                const cat: any = categoryMap.get(catIdString);
                categoryName = cat.name;
                categoryId = cat._id.toString();
            }
            // Case 2: p.category is a legacy string name (e.g. "Prayer Rugs")
            // We assume it's the name directly if it didn't match an ID
            else if (typeof p.category === 'string' && !categoryMap.has(catIdString)) {
                categoryName = p.category;
                // Optional: Only if we want to try reverse lookup by name
                const matchedCat: any = categories.find((c: any) => c.name === p.category);
                if (matchedCat) categoryId = matchedCat._id.toString();
            }
        }

        return {
            ...p,
            id: p.slug,
            _id: p._id.toString(),
            category: categoryName,
            categoryId: categoryId,
            images: p.images || [],
            description: p.description || '',
            currency: 'SAR',
            features: p.features || [],
            specifications: p.specifications || {},
            inStock: p.stock > 0
        };
    });
}



export default async function ProductsPage() {
    const products = await getProducts();
    return (
        <div className="min-h-screen bg-white">
            {/* Page Header */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-[1600px] mx-auto">
                    <h1 className="text-xl md:text-3xl font-bold uppercase tracking-normal mb-6 font-heading text-black">
                        All Products
                    </h1>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide max-w-xl">
                        Explore our latest releases and performance essentials. Built for the modern prayer experience.
                    </p>
                </div>
            </section>

            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-xs font-bold uppercase tracking-widest">Loading...</p></div>}>
                <ProductsGrid products={products} />
            </Suspense>
        </div>
    )
}
