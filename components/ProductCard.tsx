"use client"

import Link from "next/link"
import { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star, Heart, Zap, Sparkles } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

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

    // Dummy review count for Squatch feel
    const isTrending = product.isBestSeller || Math.random() > 0.7

    return (
        <Link href={`/products/${product.id}`} className="group block relative h-full">
            {/* Image Container - Soft Curved - Reference Style */}
            <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-[#F3F3F3] rounded-[2.5rem] border border-gray-50 group-hover:border-green-100 transition-colors duration-500">
                <motion.img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full mix-blend-multiply transition-all duration-700"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                />

                {/* Actions - Heart Icon for Mobile */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            toggleWishlist(product)
                        }}
                        className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                    >
                        <Heart className={`w-5 h-5 transition-colors ${isInWishlist(product.id) ? "fill-red-500 text-red-500 animate-pulse" : "text-black"}`} />
                    </button>
                </div>

                {/* Gamified Badges - Refined Premium Style */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {isTrending && (
                        <div className="bg-white/90 backdrop-blur-md text-black text-[8px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-black/5">
                            <Zap className="w-2 h-2 fill-current" />
                            Trending
                        </div>
                    )}
                    {product.inStock && Math.random() > 0.8 && (
                        <div className="bg-black/90 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                            <Sparkles className="w-2 h-2 text-yellow-400" />
                            Curated
                        </div>
                    )}
                    {!product.inStock && (
                        <span className="text-[8px] font-bold tracking-[0.25em] uppercase text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-100">Archived</span>
                    )}
                </div>

                {/* Quick Add - The Magic Button - Matching Reference (Black Circle with +) */}
                <motion.button
                    onClick={handleQuickAdd}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-3 right-3 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-lg z-10"
                    aria-label="Quick Add"
                >
                    <span className="text-xl font-light leading-none mb-0.5">+</span>
                </motion.button>
            </div>

            {/* Content - Pure Info */}
            <div className="space-y-1 text-center">
                <h3 className="text-[12px] md:text-[13px] font-medium text-black tracking-[0.02em] group-hover:text-black/60 transition-colors line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-[12px] md:text-[13px] text-gray-500 tabular-nums">
                    {product.price} SAR
                </p>
            </div>
        </Link>
    )
}
