"use client"

import Link from "next/link"
import { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Zap } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart()
    const router = useRouter()

    return (
        <Link href={`/products/${product.id}`} className="group block mb-8">
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-[1.5s] ease-in-out"
                />

                {/* NEW Tag */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="bg-kiswa-gold text-white px-2 py-1 text-[10px] font-black uppercase tracking-tight font-heading shadow-sm">
                        NEW release
                    </span>
                </div>

                {!product.inStock && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="text-xs font-black uppercase tracking-widest text-black border-2 border-black px-4 py-2">Out of Stock</span>
                    </div>
                )}
            </div>

            <div className="pt-4 space-y-1">
                <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold uppercase tracking-wide group-hover:underline decoration-2 underline-offset-4 decoration-kiswa-gold transition-all">
                        {product.name}
                    </h3>
                </div>
                <p className="text-[11px] font-medium text-gray-500 uppercase tracking-tight">
                    {product.category} • {product.features[0]}
                </p>
                <p className="font-black text-sm pt-1">
                    {product.price} {product.currency}
                </p>
            </div>
        </Link>
    )
}
