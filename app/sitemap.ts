import { MetadataRoute } from 'next'
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import Category from "@/models/Category"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.kiswastore.com'

    await dbConnect() as any;
    const products = await Product.find({ isPublished: true }).select('slug updatedAt').lean();
    const categories = await Category.find({ isActive: true }).select('slug').lean();

    const productUrls = products.map((product: any) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const categoryUrls = categories.map((category: any) => ({
        url: `${baseUrl}/products?category=${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...productUrls,
        ...categoryUrls,
    ]
}
