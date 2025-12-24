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
            <SheetContent className="w-full sm:max-w-lg p-5">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5" />
                        Shopping Cart ({count})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full pt-6">
                    {items.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                            <p className="text-muted-foreground mb-6">Add some beautiful prayer mats to get started</p>
                            <Button onClick={onClose} asChild>
                                <Link href="/products">Browse Products</Link>
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-[1fr_auto] gap-4 mb-2 px-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                <span>Product</span>
                                <span>Total</span>
                            </div>
                            <div className="flex-1 overflow-y-auto -mx-6 px-6">
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div key={item.product.id} className="flex gap-4 py-4 border-b border-border">
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-sm mb-1 truncate">{item.product.name}</h4>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    {item.product.price} {item.product.currency}
                                                </p>

                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end justify-between">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => removeFromCart(item.product.id)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                                <p className="font-medium text-sm">
                                                    {item.product.price * item.quantity} {item.product.currency}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-border pt-4 mt-4 space-y-4">
                                <div className="flex items-center justify-between text-lg font-medium">
                                    <span>Total</span>
                                    <span>{total} SAR</span>
                                </div>

                                <Button className="w-full" size="lg" asChild onClick={onClose}>
                                    <Link href="/checkout">Proceed to Checkout</Link>
                                </Button>

                                <Button variant="outline" className="w-full" onClick={onClose} asChild>
                                    <Link href="/products">Continue Shopping</Link>
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
