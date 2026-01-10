"use client"

import Link from "next/link"
import { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Zap, Heart } from "lucide-react"
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

    return (
        <Link href={`/products/${product.id}`} className="group block mb-8 animate-slide-up">
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 group-hover:shadow-lg transition-all duration-300">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />

                {/* NEW Tag */}
                <div className="absolute top-2 left-2">
                    <span className="bg-white text-black px-2 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm rounded-full">
                        New Release
                    </span>
                </div>

                {/* Wishlist Button */}
                <div className="absolute top-3 right-3 z-10 transition-opacity opacity-0 group-hover:opacity-100">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 rounded-full transition-all ${isInWishlist(product.id) ? "text-red-500 bg-white" : "bg-white/80 hover:bg-white hover:text-red-500"}`}
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleWishlist(product)
                        }}
                    >
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500" : ""}`} />
                    </Button>
                </div>

                {!product.inStock && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-black bg-white px-4 py-2 shadow-sm rounded-full">Out of Stock</span>
                    </div>
                )}
            </div>

            <div className="pt-4 space-y-1">
                <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold uppercase tracking-wide group-hover:text-gray-600 transition-colors">
                        {product.name}
                    </h3>
                </div>
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                    {product.category}
                </p>
                <p className="font-semibold text-base pt-1">
                    {product.price} {product.currency}
                </p>
            </div>
        </Link>
    )
}
