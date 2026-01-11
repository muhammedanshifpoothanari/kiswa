import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    slug: string;
    sku: string;
    description?: string;
    price: number;
    salePrice?: number;
    costPrice?: number; // For profit calculation
    stock: number;
    category: mongoose.Types.ObjectId;
    images: string[];
    attributes: {
        color?: string;
        size?: string;
        material?: string;
        [key: string]: any;
    };
    isPublished: boolean;
    isFeatured: boolean;
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
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    images: [{ type: String }],
    attributes: { type: Map, of: String },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
