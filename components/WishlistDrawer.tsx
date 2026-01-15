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
                            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
                                <div className="space-y-6">
                                    {wishlist.map((product) => (
                                        <div key={product.id} className="flex gap-4 py-4 border-b border-gray-50">
                                            {/* Soft Rounded Image */}
                                            <div className="relative w-24 h-32 overflow-hidden bg-gray-50 rounded-[1.5rem] flex-shrink-0">
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover mix-blend-multiply"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-xs uppercase tracking-wider leading-tight w-[80%] truncate">{product.name}</h4>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 text-gray-300 hover:text-red-500 -mt-1 -mr-1"
                                                            onClick={() => removeFromWishlist(product.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                                                        {product.category}
                                                    </p>
                                                </div>

                                                <div className="flex items-end justify-between mt-2">
                                                    <p className="font-bold text-sm tracking-tight">
                                                        {product.price} {product.currency}
                                                    </p>
                                                    <Button
                                                        size="sm"
                                                        className="h-9 px-5 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-black/5 hover:bg-black/90 transition-all active:scale-95"
                                                        onClick={() => handleMoveToCart(product)}
                                                    >
                                                        Add to Bag
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-50 bg-white">
                                <Button className="w-full h-14 bg-gray-50 text-black hover:bg-gray-100 rounded-full font-bold uppercase tracking-wider text-xs transition-colors" onClick={onClose} asChild>
                                    <Link href="/wishlist">View Full Wishlist</Link>
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
