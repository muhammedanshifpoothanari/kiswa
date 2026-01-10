"use client"

import { X, Heart, ShoppingBag, Trash2 } from "lucide-react"
import { useWishlist } from "@/contexts/WishlistContext"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import Link from "next/link"

interface WishlistDrawerProps {
    open: boolean
    onClose: () => void
}

export function WishlistDrawer({ open, onClose }: WishlistDrawerProps) {
    const { wishlist, removeFromWishlist } = useWishlist()
    const { addToCart } = useCart()

    const handleMoveToCart = (product: any) => {
        addToCart(product, 1)
        removeFromWishlist(product.id)
    }

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-lg p-5">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2 text-xl font-bold uppercase tracking-wide">
                        <Heart className="h-5 w-5 fill-black" />
                        My Wishlist ({wishlist.length})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full pt-6">
                    {wishlist.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-bold uppercase mb-2">Your wishlist is empty</h3>
                            <p className="text-xs font-medium text-gray-400 mb-6 uppercase tracking-wide">Save items you love to find them later</p>
                            <Button onClick={onClose} asChild className="h-10 px-6 bg-black text-white font-bold uppercase tracking-wider rounded-full text-xs">
                                <Link href="/products">Browse Products</Link>
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 overflow-y-auto -mx-6 px-6">
                                <div className="space-y-4">
                                    {wishlist.map((product) => (
                                        <div key={product.id} className="flex gap-4 py-4 border-b border-border">
                                            <div className="relative w-20 h-28 overflow-hidden bg-gray-50 rounded flex-shrink-0">
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="font-bold text-xs uppercase tracking-wide leading-tight mb-1 truncate">{product.name}</h4>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                                                        {product.category}
                                                    </p>
                                                    <p className="font-bold text-sm tracking-tight">
                                                        {product.price} {product.currency}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2 mt-4">
                                                    <Button
                                                        size="sm"
                                                        className="h-8 px-4 bg-black text-white text-[10px] font-bold uppercase tracking-wider rounded-full"
                                                        onClick={() => handleMoveToCart(product)}
                                                    >
                                                        Add to Bag
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-red-50 hover:text-red-500"
                                                    onClick={() => removeFromWishlist(product.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-border pt-4 mt-4">
                                <Button variant="ghost" className="w-full h-12 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black" onClick={onClose} asChild>
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
