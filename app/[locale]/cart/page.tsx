"use client"

import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingBag, X, Plus, Minus, ArrowRight, Lock, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart()
    const router = useRouter()
    const total = getCartTotal()
    const count = getCartCount()

    return (
        <div className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-[1200px] mx-auto">
                {/* Progress Indicator - Minimalist Premium */}
                {items.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">01 Bag</span>
                                <div className="w-12 h-[1px] bg-black"></div>
                            </div>
                            <div className="flex items-center gap-2 opacity-20">
                                <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">02 Checkout</span>
                                <div className="w-12 h-[1px] bg-black"></div>
                            </div>
                            <div className="flex items-center gap-2 opacity-20">
                                <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">03 Payment</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-black">
                        Shopping Bag
                        <span className="text-lg md:text-xl text-gray-400 font-medium ml-2 align-top">
                            ({count})
                        </span>
                    </h1>
                </div>

                {/* Cart Content */}
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 border border-dashed border-gray-100 rounded-[2rem]">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag className="w-8 h-8 text-gray-300" />
                        </div>
                        <h2 className="text-xl font-bold uppercase tracking-wide mb-2">Your Bag is Empty</h2>
                        <p className="text-gray-400 mb-2 font-medium">Let's find something beautiful for you!</p>
                        <p className="text-sm text-gray-400 mb-8">💡 Start by browsing our collection</p>
                        <Button asChild className="h-14 px-10 bg-black text-white hover:bg-black/90 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-black/10 transition-all active:scale-95">
                            <Link href="/products" className="flex items-center gap-2">
                                Explore Collection
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {items.map((item) => (
                                <div key={item.product.id} className="flex gap-6 p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-black/20 transition-all">
                                    {/* Image */}
                                    <div className="relative w-24 h-32 bg-gray-50 overflow-hidden rounded-[1.5rem] flex-shrink-0 border border-gray-100/50">
                                        <img
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover mix-blend-multiply"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-sm font-bold uppercase tracking-wider text-black pr-4">
                                                    {item.product.name}
                                                </h3>
                                                <button
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">
                                                {item.product.category}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3 bg-gray-50 rounded-full px-1 py-1 ring-1 ring-gray-100">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center text-xs font-bold tabular-nums">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <p className="text-base font-bold tracking-wide">
                                                {(item.product.price * item.quantity).toLocaleString()} <span className="text-xs text-gray-400">{item.product.currency}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary - Gamified */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 bg-gradient-to-br from-gray-50 to-white rounded-[2.5rem] p-8 border border-gray-200 shadow-lg">
                                {/* Premium Trust Badge */}
                                <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full mb-8 border border-gray-100 bg-gray-50/50">
                                    <Lock className="w-3.5 h-3.5 text-black" />
                                    <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">Secure Gateway</span>
                                </div>

                                <h2 className="text-lg font-bold uppercase tracking-tight mb-8">Order Summary</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-medium uppercase tracking-wider text-xs">Subtotal</span>
                                        <span className="font-bold tracking-wide">{total.toLocaleString()} SAR</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-medium uppercase tracking-wider text-xs">Shipping</span>
                                        <span className="font-bold tracking-wide">Calculated at checkout</span>
                                    </div>
                                    <div className="border-t border-gray-100 pt-6 flex justify-between items-center">
                                        <span className="text-sm font-bold uppercase tracking-[0.1em]">Total</span>
                                        <span className="text-2xl font-bold tracking-tighter text-black">{total.toLocaleString()} <span className="text-xs font-normal text-gray-400 align-top ml-1">SAR</span></span>
                                    </div>
                                </div>

                                {/* Premium Checkout Button with Guiding Light */}
                                <div className="relative mb-4 group">
                                    <Button asChild className="relative w-full h-14 bg-black text-white hover:bg-black/90 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-black/10 transition-all overflow-hidden active:scale-[0.98]">
                                        <Link href="/checkout" className="flex items-center justify-center gap-2">
                                            <span>Proceed to Checkout</span>
                                            <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                    {/* Guiding Light */}
                                    <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-blue-400/20 via-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md -z-10 animate-pulse-slow"></div>
                                </div>

                                <Button asChild variant="outline" className="w-full h-12 rounded-full font-bold uppercase tracking-wider text-xs border-gray-300 hover:bg-gray-50">
                                    <Link href="/products">Continue Shopping</Link>
                                </Button>

                                <div className="mt-8 flex items-center justify-center py-4 border-t border-gray-100">
                                    <div className="flex items-center gap-3 opacity-40">
                                        <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
                                        <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Signature Collection</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
