"use client"

import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image"

interface CartDrawerProps {
    open: boolean
    onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
    const { items, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart()

    const total = getCartTotal()
    const count = getCartCount()

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-lg p-0 bg-white border-l rounded-l-lg">
                <SheetHeader className="p-8 border-b">
                    <SheetTitle className="flex items-center gap-3 font-bold uppercase text-xl tracking-wide">
                        <ShoppingBag className="h-6 w-6" />
                        Bag ({count})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full">
                    {items.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                            <div className="w-20 h-20 bg-gray-50 flex items-center justify-center mb-8 rounded-full">
                                <ShoppingBag className="h-8 w-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold uppercase mb-2">Your bag is empty</h3>
                            <p className="text-xs font-medium text-gray-400 mb-8 uppercase tracking-wide">Add something to your bag to continue</p>
                            <Button onClick={onClose} asChild className="h-12 px-8 bg-black text-white font-bold uppercase tracking-wider rounded-full hover:bg-gray-800 transition-all">
                                <Link href="/products">Browse Products</Link>
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
                                <div className="space-y-8">
                                    {items.map((item, index) => (
                                        <div
                                            key={item.product.id}
                                            className="flex gap-6 animate-slide-up"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <div className="relative w-24 h-32 bg-gray-50 overflow-hidden rounded flex-shrink-0">
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex justify-between items-start gap-4">
                                                        <h4 className="font-bold text-xs uppercase tracking-wide leading-tight truncate">{item.product.name}</h4>
                                                        <button
                                                            onClick={() => removeFromCart(item.product.id)}
                                                            className="text-gray-300 hover:text-black transition-colors"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1">
                                                        {item.product.category}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center border rounded overflow-hidden">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            className="h-8 w-8 flex items-center justify-center hover:bg-gray-50 transition-colors border-r font-medium"
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="w-10 text-center text-xs font-medium">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="h-8 w-8 flex items-center justify-center hover:bg-gray-50 transition-colors border-l font-medium"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                    <p className="font-bold text-sm tracking-tight">
                                                        {item.product.price * item.quantity} {item.product.currency}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            {/* Cart Upsell Section */}
                            <div className="px-8 py-6 bg-gray-50/50 border-t border-b">
                                <h4 className="font-bold text-[10px] uppercase tracking-wider text-gray-500 mb-4">Pairs Well With</h4>
                                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                    {/* Mock Upsell Product */}
                                    <div className="min-w-[140px] bg-white rounded-lg p-3 border shadow-sm">
                                        <div className="aspect-square bg-gray-100 rounded mb-2 overflow-hidden">
                                            <img src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/7_ehleqh.png" className="w-full h-full object-cover" alt="Upsell" />
                                        </div>
                                        <p className="font-bold text-xs line-clamp-1 mb-1">Premium Musk</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-medium text-gray-500">45 SAR</span>
                                            <button className="text-[10px] font-bold uppercase bg-black text-white px-2 py-1 rounded-full">Add</button>
                                        </div>
                                    </div>
                                    <div className="min-w-[140px] bg-white rounded-lg p-3 border shadow-sm">
                                        <div className="aspect-square bg-gray-100 rounded mb-2 overflow-hidden">
                                            <img src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408929/4_jzf1im.png" className="w-full h-full object-cover" alt="Upsell" />
                                        </div>
                                        <p className="font-bold text-xs line-clamp-1 mb-1">Travel Mat</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-medium text-gray-500">120 SAR</span>
                                            <button className="text-[10px] font-bold uppercase bg-black text-white px-2 py-1 rounded-full">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-white space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                        <span>Subtotal</span>
                                        <span>{total} SAR</span>
                                    </div>
                                    <div className="flex items-center justify-between text-lg font-bold uppercase tracking-wide">
                                        <span>Total</span>
                                        <span>{total} SAR</span>
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    <Button className="w-full h-14 bg-black text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-gray-800 transition-all shadow-lg shadow-black/5" size="lg" asChild onClick={onClose}>
                                        <Link href="/checkout">Checkout Now</Link>
                                    </Button>

                                    <Button variant="ghost" className="w-full h-12 text-gray-500 font-bold uppercase tracking-wider text-xs hover:text-black transition-all" onClick={onClose} asChild>
                                        <Link href="/products">Continue Shopping</Link>
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet >
    )
}
