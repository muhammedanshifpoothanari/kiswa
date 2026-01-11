import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;

        // Try finding by ID first, then slug
        let product;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            product = await Product.findById(id).populate('category');
        } else {
            product = await Product.findOne({ slug: id, isPublished: true }).populate('category');
        }

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}
