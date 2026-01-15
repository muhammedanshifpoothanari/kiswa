"use client"

import { useWishlist } from "@/contexts/WishlistContext"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart } from "lucide-react"

export default function WishlistPage() {
    const { wishlist } = useWishlist()

    return (
        <div className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-[1800px] mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-black">
                        Favorites
                        <span className="text-lg md:text-xl text-gray-400 font-medium ml-2 align-top">
                            ({wishlist.length})
                        </span>
                    </h1>
                </div>

                {/* Grid */}
                {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 border border-dashed border-gray-100 rounded-[2rem]">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <Heart className="w-8 h-8 text-gray-300 fill-gray-300" />
                        </div>
                        <h2 className="text-xl font-bold uppercase tracking-wide mb-2">No Favorites Yet</h2>
                        <p className="text-gray-400 mb-8 font-medium">Items you love will appear here.</p>
                        <Button asChild className="h-14 px-10 bg-black text-white rounded-full font-bold uppercase tracking-wider hover:bg-black/90 shadow-xl shadow-black/5">
                            <Link href="/products">Start Browsing</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-4 md:gap-x-8">
                        {wishlist.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
