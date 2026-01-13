import mongoose, { Schema, Document, Model } from 'mongoose';
import { ICategory } from './Category';

export interface IProduct extends Document {
    name: string;
    slug: string;
    sku: string;
    description?: string;
    price: number;
    salePrice?: number;
    costPrice?: number; // For profit calculation
    stock: number;
    category: ICategory | string; // Populated or ID
    images: string[];
    features: string[];
    specifications: {
        [key: string]: string;
    };
    isPublished: boolean;
    isFeatured: boolean;
    isBestSeller: boolean;
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sku: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    costPrice: { type: Number },
    stock: { type: Number, default: 0 },
    // Relaxed type to allow legacy string data during migration
    category: { type: Schema.Types.Mixed, ref: 'Category', required: true },
    images: [{ type: String }],
    features: [{ type: String }],
    specifications: { type: Map, of: String },
    isPublished: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false }
}, { timestamps: true });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
