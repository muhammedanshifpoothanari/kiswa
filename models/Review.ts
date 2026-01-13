import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
    user: string; // Name of reviewer (or ref to User if logged in)
    role?: string; // e.g. "Verified Buyer", "Interior Designer"
    content: string;
    rating: number; // 1-5
    isFeatured: boolean; // For homepage display
}

const ReviewSchema = new Schema<IReview>({
    user: { type: String, required: true },
    role: { type: String },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
export default Review;
