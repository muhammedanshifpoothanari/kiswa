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

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault() // Prevent link navigation
        addToCart(product, 1)
    }

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault()
        addToCart(product, 1)
        router.push("/checkout")
    }

    return (
        <Link href={`/products/${product.id}`} className="group block">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                {!product.inStock && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <span className="text-sm font-medium">Out of Stock</span>
                    </div>
                )}
                <div className="absolute top-3 left-3 bg-black/5 backdrop-blur-md text-xs font-medium px-2 py-1 rounded-full">
                    {product.category}
                </div>
            </div>

            <div className="pt-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    <span className="font-medium text-lg whitespace-nowrap">{product.price} <span className="text-xs font-normal text-muted-foreground">{product.currency}</span></span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{product.features[0]}</p>

                <div className="grid grid-cols-5 gap-3">
                    <Button
                        className="col-span-1 h-10 w-full rounded-full"
                        variant="secondary"
                        size="icon"
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                    >
                        <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button
                        className="col-span-4 h-10 w-full rounded-full font-bold"
                        onClick={handleBuyNow}
                        disabled={!product.inStock}
                    >
                        Order Now
                    </Button>
                </div>
            </div>
        </Link>
    )
}
