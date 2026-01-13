import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { products } from '@/data/products';

export async function POST() {
    try {
        await dbConnect();

        // Optional: clear existing products to avoid duplicates or use upsert
        await Promise.all([
            Product.deleteMany({}),
            // Use dynamic import or ensure models are registered if needed, but for now assuming global registration
            // We need to import Order and Customer to delete them
        ]);

        // Dynamic imports to avoid circular dependency issues if any
        const Order = (await import('@/models/Order')).default;
        const Customer = (await import('@/models/Customer')).default;
        const Category = (await import('@/models/Category')).default;
        const Review = (await import('@/models/Review')).default;

        await Promise.all([
            Order.deleteMany({}),
            Customer.deleteMany({}),
            Category.deleteMany({}),
            Review.deleteMany({})
        ]);

        // Seed Categories
        const categoriesData = [
            { name: 'Prayer Rugs', slug: 'prayer-rugs', image: 'https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/1_zimfqs.png' },
            { name: 'Ihram', slug: 'ihram', image: 'https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/3_lsyqvl.png' },
            { name: 'Thobes', slug: 'thobes', image: 'https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/5_fi9ezu.png' },
            { name: 'Gift Sets', slug: 'gifts', image: 'https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/6_asqgm2.png' }
        ];
        const createdCategories = await Category.insertMany(categoriesData);

        // Create a map of category slug/name to ID
        // Note: The product data has strings like 'Prayer Rugs' which might need mapping
        const categoryMap: Record<string, string> = {};
        createdCategories.forEach(c => {
            categoryMap[c.name] = c._id.toString();
            categoryMap[c.slug] = c._id.toString();
            // Also map some data-specific variations if needed
            if (c.slug === 'prayer-rugs') {
                categoryMap['Premium Collection'] = c._id.toString();
                categoryMap['Luxury Collection'] = c._id.toString();
                categoryMap['Comfort Collection'] = c._id.toString();
                categoryMap['Travel Collection'] = c._id.toString();
            }
        });

        // Seed Reviews (Testimonials)
        const reviewsData = [
            { user: 'Ahmed S.', role: 'Verified Buyer', content: 'The quality of the Kiswa rug is unmatched. It feels spiritual just to touch it.', rating: 5, isFeatured: true },
            { user: 'Sarah K.', role: 'Interior Designer', content: 'Beautiful craftsmanship. I recommend these to all my clients looking for authentic pieces.', rating: 5, isFeatured: true },
            { user: 'Mohammed A.', role: 'Traveler', content: 'Perfect for my Umrah trip. Lightweight yet durable. Highly recommended.', rating: 5, isFeatured: true }
        ];
        await Review.insertMany(reviewsData);

        const productsToInsert = products.map(p => {
            // Find matching category ID or default to first one
            let catId = categoryMap[p.category] || categoryMap['Prayer Rugs']; // Fallback

            // If we really can't find it, just grab the first created category
            if (!catId && createdCategories.length > 0) catId = createdCategories[0]._id.toString();

            return {
                name: p.name,
                slug: p.id, // Using the string ID as slug
                sku: `SKU-${p.id}`,
                description: p.description,
                price: p.price,
                stock: 100, // Default stock
                category: catId,
                images: p.images,
                features: p.features,
                specifications: p.specifications,
                isPublished: p.inStock,
                isFeatured: p.category === 'Premium Collection', // Simple logic for featured
                isBestSeller: false
            };
        });

        await Product.insertMany(productsToInsert);

        return NextResponse.json({ message: 'Database seeded successfully', count: productsToInsert.length });
    } catch (error: any) {
        console.error('Seeding error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
