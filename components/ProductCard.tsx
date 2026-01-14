"use client"

import Link from "next/link"
import { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"
import { useRouter } from "next/navigation"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart()
    const { toggleWishlist, isInWishlist } = useWishlist()
    const router = useRouter()

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(product)
    }

    // Dummy review count for Squatch feel (replace with real data later)
    const reviewCount = Math.floor(Math.random() * 500) + 50
    const rating = 4.8

    return (
        <Link href={`/products/${product.id}`} className="group block relative h-full">
            {/* Image Container - White Void - Natural Aspect Ratio */}
            <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-[#F5F5F7] rounded-3xl">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full mix-blend-multiply transition-transform duration-[1s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105 group-hover:opacity-90"
                />

                {/* Badges - Floating Glass */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {!product.inStock && (
                        <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-black bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full">Unavailable</span>
                    )}
                    {product.isBestSeller && (
                        <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-black bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full">Icon</span>
                    )}
                </div>

                {/* Quick Add - The Magic Button */}
                <button
                    onClick={handleQuickAdd}
                    className="absolute bottom-4 right-4 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] shadow-2xl hover:scale-110 z-10"
                    aria-label="Quick Add"
                >
                    <span className="text-2xl font-light leading-none">+</span>
                </button>
            </div>

            {/* Content - Pure Info */}
            <div className="space-y-1 text-center">
                <h3 className="text-[13px] font-medium text-black tracking-[0.02em] group-hover:text-black/60 transition-colors">
                    {product.name}
                </h3>
                <p className="text-[13px] text-gray-500 tabular-nums">
                    {product.price} SAR
                </p>
            </div>
        </Link>
    )
}
