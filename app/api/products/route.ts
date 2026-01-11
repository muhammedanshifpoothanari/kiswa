import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        // Populate category for filtering if needed
        const products = await Product.find({ isPublished: true })
            .populate('category', 'name slug')
            .sort({ createdAt: -1 });

        // Transform to match Store's expected format if necessary, or update Store to match Model
        // For now, I'll return the raw document, and we adjust the frontend to map it.
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
