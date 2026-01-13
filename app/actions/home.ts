"use server"

import dbConnect from "@/lib/mongodb"
import Category from "@/models/Category"
import Review from "@/models/Review"
import Product from "@/models/Product"

export async function getCategories() {
    await dbConnect()
    const categories = await Category.find({ isActive: true }).lean()
    return categories.map(c => ({
        ...c,
        _id: c._id.toString(),
        parent: c.parent ? c.parent.toString() : null
    }))
}

export async function getReviews() {
    await dbConnect()
    const reviews = await Review.find({ isFeatured: true }).limit(3).lean()
    return reviews.map(r => ({
        ...r,
        _id: r._id.toString()
    }))
}

export async function getHomePageProducts() {
    await dbConnect()

    // Fetch all categories for lookup
    const categories = await Category.find({}).lean();
    const categoryMap = new Map(categories.map((c: any) => [c._id.toString(), c]));

    const products = await Product.find({ isPublished: true }).lean()

    // Transform for frontend
    const mappedProducts = products.map(p => {
        let categoryName = 'Uncategorized';

        if (p.category) {
            const catIdString = p.category.toString();
            // Case 1: ID Match
            if (categoryMap.has(catIdString)) {
                categoryName = (categoryMap.get(catIdString) as any).name;
            }
            // Case 2: String Match (Legacy)
            else if (typeof p.category === 'string') {
                categoryName = p.category;
            }
        }

        return {
            ...p,
            id: p.slug,
            _id: p._id.toString(),
            category: categoryName,
            images: p.images || [],
            description: p.description || '',
            currency: 'SAR',
            features: p.features || [],
            specifications: p.specifications || {},
            inStock: p.stock > 0
        }
    })

    // Filter Bestsellers
    // If we have products marked as best sellers, use them. Otherwise take first 4.
    const bestSellerProducts = mappedProducts.filter(p => p.isBestSeller);
    const displayedBestsellers = bestSellerProducts.length > 0
        ? bestSellerProducts.slice(0, 4)
        : mappedProducts.slice(0, 4);

    return {
        all: mappedProducts,
        bestsellers: displayedBestsellers
    }
}

