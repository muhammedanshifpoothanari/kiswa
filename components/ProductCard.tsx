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
            {/* Image Container - Standard 4:5 Aspect Ratio */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-2 rounded-xl">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />

                {/* Badges - Minimal Floating */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {!product.inStock && (
                        <span className="bg-white/90 backdrop-blur-md text-black px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide rounded-sm shadow-sm">Sold Out</span>
                    )}
                    {product.isBestSeller && (
                        <span className="bg-black/80 backdrop-blur-md text-white px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide rounded-sm shadow-sm">Best</span>
                    )}
                </div>

                {/* Quick Add - Minimalist Floating Pill (Desktop) */}
                <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hidden md:block z-20">
                    <Button
                        onClick={handleQuickAdd}
                        className="w-full bg-white/90 backdrop-blur-md hover:bg-black hover:text-white text-black font-medium text-xs uppercase tracking-wide h-9 rounded-full shadow-lg transition-colors"
                    >
                        Quick Add
                    </Button>
                </div>

                {/* Mobile Quick Add (Icon) */}
                <button
                    onClick={handleQuickAdd}
                    className="md:hidden absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-black active:scale-95 transition-transform"
                >
                    <span className="text-lg leading-none mb-0.5">+</span>
                </button>
            </div>

            {/* Content - Minimal Text */}
            <div className="space-y-0.5 px-0.5">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-1 group-hover:text-black transition-colors">
                        {product.name}
                    </h3>
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-gray-900">{product.price} <span className="text-[10px] font-normal text-gray-500">SAR</span></span>
                    </div>
                </div>

                {/* Micro Rating */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex text-black text-[8px]">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <span key={s}>★</span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}
