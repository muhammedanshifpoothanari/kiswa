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
        <div className="min-h-screen bg-white">
            {/* Main Content */}
            <section className="pt-20 lg:pt-32 pb-24 px-6 lg:px-12">
                <div className="max-w-[1600px] mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
                        {/* Images Section */}
                        <div className="space-y-6">
                            <div className="bg-gray-100 aspect-[2/3] overflow-hidden">
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
                                            className={`aspect-[2/3] overflow-hidden bg-gray-100 border-2 transition-all ${selectedImage === index ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${product.name} - ${index}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Info Section */}
                        <div className="flex flex-col gap-10">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    {product.category}
                                </p>
                                <h1 className="text-4xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.9]">
                                    {product.name}
                                </h1>
                                <p className="text-2xl font-black tracking-tight">{product.price} {product.currency}</p>
                            </div>

                            <div className="space-y-6">
                                <p className="text-xs font-bold text-gray-500 uppercase leading-relaxed max-w-lg tracking-wide">
                                    {product.description}
                                </p>

                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-black">Highlights</h3>
                                    <ul className="grid grid-cols-1 gap-y-3">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-tight text-gray-500">
                                                <div className="w-1.5 h-1.5 bg-black rotate-45" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Purchase Section */}
                            <div className="space-y-8 pt-8 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Quantity</span>
                                    <div className="flex items-center border-2 border-black h-12">
                                        <button
                                            className="px-4 hover:bg-black hover:text-white transition-colors h-full flex items-center"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={!product.inStock}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-12 text-center font-black text-sm">{quantity}</span>
                                        <button
                                            className="px-4 hover:bg-black hover:text-white transition-colors h-full flex items-center"
                                            onClick={() => setQuantity(quantity + 1)}
                                            disabled={!product.inStock}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {product.inStock ? (
                                    <div className="space-y-4">
                                        <Button
                                            className="w-full h-16 bg-black text-white hover:bg-[#333] font-black uppercase tracking-widest text-xs"
                                            onClick={inCart ? handleUpdateCart : handleAddToCart}
                                        >
                                            {inCart ? `UPDATE QTY (${cartItem?.quantity})` : "ADD TO BAG"}
                                        </Button>
                                        <Button
                                            className="w-full h-16 bg-white border-2 border-black text-black hover:bg-black hover:text-white font-black uppercase tracking-widest text-xs transition-colors"
                                            onClick={handleBuyNow}
                                        >
                                            GO TO CHECKOUT
                                        </Button>

                                        {/* Trust Signals for 45+ Persona */}
                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            <div className="flex items-center justify-center gap-2 text-tiny font-bold uppercase tracking-wide text-gray-500">
                                                <Zap className="h-3 w-3" />
                                                <span>Free Shipping</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-tiny font-bold uppercase tracking-wide text-gray-500">
                                                <Check className="h-3 w-3" />
                                                <span>Secure Checkout</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Button className="w-full h-16 border-2 border-gray-200 text-gray-300 cursor-not-allowed font-black uppercase tracking-widest" disabled>
                                        OUT OF STOCK
                                    </Button>
                                )}
                            </div>

                            {/* Specs Accordion Placeholder */}
                            <div className="pt-8 border-t border-gray-100 space-y-4">
                                <div className="flex justify-between items-center py-2 cursor-pointer group">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Specifications</span>
                                    <div className="w-4 h-[2px] bg-black" />
                                </div>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        value && (
                                            <div key={key} className="space-y-1">
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{key}</p>
                                                <p className="text-[11px] font-black uppercase">{value}</p>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
