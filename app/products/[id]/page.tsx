"use client"

import { useState, use } from "react"
import { notFound, useRouter } from "next/navigation"
import { getProductById } from "@/data/products"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check, Minus, Plus, ArrowLeft, Zap } from "lucide-react"
import Link from "next/link"
import { ProductPaymentPromo } from "@/components/ProductPaymentPromo"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const resolvedParams = use(params)
    const product = getProductById(resolvedParams.id)
    const { addToCart, isInCart, items, updateQuantity } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)

    if (!product) {
        notFound()
    }

    const inCart = isInCart(product.id)
    const cartItem = items.find(item => item.product.id === product.id)

    const handleAddToCart = () => {
        addToCart(product, quantity)
        setQuantity(1)
    }

    const handleBuyNow = () => {
        addToCart(product, quantity)
        router.push("/checkout")
    }

    const handleUpdateCart = () => {
        if (cartItem) {
            updateQuantity(product.id, cartItem.quantity + quantity)
            setQuantity(1)
        }
    }

    return (
        <div className="min-h-screen bg-background pb-24 md:pb-0">
            {/* Back Button */}
            <section className="pt-32 pb-6 px-6">
                <div className="max-w-7xl mx-auto">
                    <Button variant="ghost" asChild className="rounded-full">
                        <Link href="/products">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Products
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Product Detail */}
            <section className="py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Images */}
                        <div className="space-y-4">
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`relative aspect-square rounded-lg overflow-hidden bg-secondary border-2 transition-colors ${selectedImage === index ? "border-accent" : "border-transparent"
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${product.name} - Image ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="space-y-6">
                            <div>
                                <span className="text-sm font-medium text-accent uppercase tracking-wider">
                                    {product.category}
                                </span>
                                <h1 className="text-4xl md:text-5xl font-medium tracking-tight mt-2 mb-4">
                                    {product.name}
                                </h1>
                                <div className="text-3xl font-medium text-foreground">
                                    {product.price} SAR
                                </div>

                                { /* <ProductPaymentPromo price={product.price} /> */}

                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>

                            {/* Features */}
                            <div>
                                <h3 className="font-medium mb-3">Features</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="text-accent mt-1">✦</span>
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Specifications */}
                            {Object.keys(product.specifications).length > 0 && (
                                <div>
                                    <h3 className="font-medium mb-3">Specifications</h3>
                                    <dl className="grid grid-cols-2 gap-3">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            value && (
                                                <div key={key}>
                                                    <dt className="text-sm text-muted-foreground capitalize">{key}</dt>
                                                    <dd className="text-sm font-medium">{value}</dd>
                                                </div>
                                            )
                                        ))}
                                    </dl>
                                </div>
                            )}

                            {/* Add to Cart Desktop */}
                            <div className="space-y-4 pt-4 border-t border-border hidden md:block">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium">Quantity:</span>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={!product.inStock}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setQuantity(quantity + 1)}
                                            disabled={!product.inStock}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {product.inStock ? (
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="w-full rounded-xl h-14 text-lg"
                                            onClick={inCart ? handleUpdateCart : handleAddToCart}
                                        >
                                            {inCart ? (
                                                <>
                                                    <Check className="h-5 w-5 mr-2" />
                                                    Updated ({cartItem?.quantity})
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                                    Add to Cart
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            size="lg"
                                            className="w-full rounded-xl h-14 text-lg font-bold"
                                            onClick={handleBuyNow}
                                        >
                                            Order Now
                                            <Zap className="h-5 w-5 ml-2 fill-current" />
                                        </Button>
                                    </div>
                                ) : (
                                    <Button size="lg" className="w-full rounded-full" disabled>
                                        Out of Stock
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Sticky Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border md:hidden z-50 pb-8">
                <div className="flex gap-3">
                    <div className="flex items-center gap-2 border rounded-lg px-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-8"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            disabled={!product.inStock}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium w-6 text-center">{quantity}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-8"
                            onClick={() => setQuantity(quantity + 1)}
                            disabled={!product.inStock}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button
                        size="lg"
                        className="flex-1 rounded-xl h-12 text-lg font-bold"
                        onClick={handleBuyNow}
                        disabled={!product.inStock}
                    >
                        Order Now
                        <Zap className="h-5 w-5 ml-2 fill-current" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
