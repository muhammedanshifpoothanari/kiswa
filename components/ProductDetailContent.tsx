"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Zap, Check } from "lucide-react"
import { PhoneVerificationModal } from "@/components/PhoneVerificationModal"
import { useAnalytics } from "@/hooks/use-analytics"
import { BackButton } from "@/components/BackButton"
import { ProductCard } from "@/components/ProductCard"
import { useRouter } from "next/navigation"

interface ProductDetailContentProps {
    product: any; // Using any for flexibility with serialized MongoDB obj
    relatedProducts: any[];
}

export function ProductDetailContent({ product, relatedProducts }: ProductDetailContentProps) {
    const router = useRouter()
    const { addToCart, isInCart, items, updateQuantity } = useCart()
    const { trackEvent } = useAnalytics()
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)

    // Auth State
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

    // Check verification status on load
    useEffect(() => {
        const checkVerification = () => {
            const stored = localStorage.getItem('kiswa_verified_user')
            if (stored) {
                const data = JSON.parse(stored)
                if (new Date(data.expiresAt) > new Date()) {
                    setIsVerified(true)
                } else {
                    localStorage.removeItem('kiswa_verified_user')
                    setIsVerified(false)
                    setIsVerificationModalOpen(true) // Open if expired
                }
            } else {
                setIsVerified(false)
                setIsVerificationModalOpen(true) // Open if never verified
            }
        }
        checkVerification()
    }, [])

    // Track Product View
    // Sticky Bar Logic
    const [showStickyBar, setShowStickyBar] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            // Show bar after scrolling past 500px (approx height of image + header)
            setShowStickyBar(window.scrollY > 600)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        if (product) {
            trackEvent('product_view', {
                metadata: {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category
                }
            })
        }
    }, [product, trackEvent])

    const inCart = isInCart(product.id)
    const cartItem = items.find(item => item.product.id === product.id)

    const handleAction = (action: () => void) => {
        if (!isVerified) {
            setIsVerificationModalOpen(true)
            return
        }
        action()
    }

    const handleAddToCart = () => {
        handleAction(() => {
            addToCart(product, quantity)
            trackEvent('add_to_cart', {
                metadata: {
                    productId: product.id,
                    name: product.name,
                    quantity: quantity,
                    price: product.price
                }
            })
            setQuantity(1)
        })
    }

    const handleBuyNow = () => {
        handleAction(() => {
            addToCart(product, quantity)
            trackEvent('add_to_cart', {
                metadata: {
                    productId: product.id,
                    name: product.name,
                    quantity: quantity,
                    price: product.price
                }
            })
            trackEvent('checkout_start', { metadata: { source: 'buy_now' } })
            router.push("/checkout")
        })
    }

    const handleUpdateCart = () => {
        handleAction(() => {
            if (cartItem) {
                updateQuantity(product.id, cartItem.quantity + quantity)
                setQuantity(1)
            }
        })
    }

    return (
        <div className="min-h-screen bg-white">
            <PhoneVerificationModal
                isOpen={isVerificationModalOpen}
                onClose={() => setIsVerificationModalOpen(false)}
                onVerified={() => setIsVerified(true)}
            />

            {/* Main Content */}
            <section className="pt-20 lg:pt-32 pb-24 px-4 lg:px-12">
                <div className="max-w-[1600px] mx-auto">
                    <BackButton className="mb-8" />
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
                                    {product.images.map((image: string, index: number) => (
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
                        <div className="flex flex-col gap-8">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-2">
                                    {product.category}
                                </p>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
                                    {product.name}
                                </h1>
                                <p className="text-2xl font-semibold text-gray-900">{product.price} <span className="text-sm text-gray-500 font-normal">{product.currency}</span></p>
                            </div>

                            <div className="space-y-6">
                                <p className="text-base text-gray-600 leading-relaxed max-w-lg">
                                    {product.description}
                                </p>

                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-gray-900">Highlights</h3>
                                    <ul className="space-y-2">
                                        {product.features.map((feature: string, index: number) => (
                                            <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Purchase Section */}
                            <div className="space-y-8 pt-8 border-t border-gray-100">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center border border-gray-200 rounded-full h-11 bg-gray-50/50">
                                        <button
                                            className="px-4 hover:text-black text-gray-500 transition-colors h-full flex items-center"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={!product.inStock}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-8 text-center font-medium text-sm">{quantity}</span>
                                        <button
                                            className="px-4 hover:text-black text-gray-500 transition-colors h-full flex items-center"
                                            onClick={() => setQuantity(quantity + 1)}
                                            disabled={!product.inStock}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-500 font-medium">Quantity</span>
                                </div>

                                {product.inStock ? (
                                    <div className="space-y-4">
                                        {/* Personalization Section */}
                                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-3">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="personalization"
                                                    className="w-4 h-4 accent-black rounded"
                                                    onChange={(e) => {
                                                        // Toggle logic if needed, for now just UI
                                                    }}
                                                />
                                                <label htmlFor="personalization" className="text-sm font-medium text-gray-900 cursor-pointer select-none">
                                                    Add Personalized Embroidery (+25 SAR)
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Enter name (e.g. Abdullah)"
                                                className="w-full h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                                                maxLength={20}
                                            />
                                            <p className="text-xs text-gray-400">Max 20 characters. English or Arabic.</p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <Button
                                                className="flex-1 h-12 bg-black text-white hover:bg-gray-800 font-medium text-base rounded-full shadow-lg hover:shadow-xl transition-all"
                                                onClick={inCart ? handleUpdateCart : handleAddToCart}
                                            >
                                                {inCart ? `Update Qty (${cartItem?.quantity})` : "Add to Cart"}
                                            </Button>
                                            <Button
                                                className="flex-1 h-12 bg-white border border-gray-200 text-black hover:bg-gray-50 font-medium text-base rounded-full transition-all"
                                                onClick={handleBuyNow}
                                            >
                                                Buy Now
                                            </Button>
                                        </div>

                                        {/* Trust Signals */}
                                        <div className="flex items-center gap-6 pt-2">
                                            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                                <Zap className="h-4 w-4 text-gray-400" />
                                                <span>Free Shipping</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                                <Check className="h-4 w-4 text-gray-400" />
                                                <span>Secure Checkout</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Button className="w-full h-12 bg-gray-100 text-gray-400 cursor-not-allowed font-medium rounded-full" disabled>
                                        Out of Stock
                                    </Button>
                                )}
                            </div>

                            {/* Specs Accordion Placeholder */}
                            <div className="pt-8 border-t border-gray-100 space-y-4">
                                <div className="flex justify-between items-center py-2 cursor-pointer group">
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Specifications</span>
                                    <div className="w-4 h-[2px] bg-black" />
                                </div>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                    {Object.entries(product.specifications || {}).map(([key, value]) => (
                                        value && (
                                            <div key={key} className="space-y-1">
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{key}</p>
                                                <p className="text-[11px] font-bold uppercase">{value as string}</p>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Products Section */}
            <section className="py-16 px-4 lg:px-12 border-t border-gray-100 bg-gray-50/50">
                <div className="max-w-[1600px] mx-auto">
                    <h2 className="text-2xl font-bold mb-8 text-black">Frequently Bought Together</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {relatedProducts
                            .map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="py-16 px-4 lg:px-12 border-t border-gray-100 bg-white">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-2xl font-bold mb-10 text-black">Customer Reviews</h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Summary */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="flex items-end gap-4">
                                <span className="text-6xl font-black text-black leading-none">4.8</span>
                                <div className="space-y-1 mb-1">
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-xl">★</span>)}
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium">Based on 128 reviews</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {[
                                    { stars: 5, pct: "85%" },
                                    { stars: 4, pct: "10%" },
                                    { stars: 3, pct: "3%" },
                                    { stars: 2, pct: "1%" },
                                    { stars: 1, pct: "1%" },
                                ].map((row) => (
                                    <div key={row.stars} className="flex items-center gap-3 text-xs font-medium">
                                        <span className="w-3">{row.stars}</span>
                                        <span className="text-gray-300">★</span>
                                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: row.pct }} />
                                        </div>
                                        <span className="w-8 text-right text-gray-400">{row.pct}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6">
                                <Button className="w-full h-12 bg-white border border-black text-black hover:bg-black hover:text-white rounded-full font-medium transition-colors">
                                    Write a Review
                                </Button>
                            </div>
                        </div>

                        {/* Review List */}
                        <div className="md:col-span-2 space-y-8">
                            {[
                                { name: "Ahmed K.", date: "2 days ago", rating: 5, text: "Absolutely stunning quality. The velvet feel is premium and the memory foam makes a huge difference for my knees.", title: "Exceeded Expectations" },
                                { name: "Sarah M.", date: "1 week ago", rating: 5, text: "I bought this as a gift for my husband and he considers it the best gift ever. The embroidery detail is perfect.", title: "Perfect Gift" },
                                { name: "Omar F.", date: "2 weeks ago", rating: 4, text: "Great product, fast shipping. I just wish there were more color options for the travel mat.", title: "Solid Quality" },
                            ].map((review, i) => (
                                <div key={i} className="border-b border-gray-100 pb-8 last:border-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
                                                {review.name[0]}
                                            </div>
                                            <span className="text-sm font-bold text-black">{review.name}</span>
                                            <span className="text-xs text-green-600 flex items-center gap-0.5">
                                                <Check className="w-3 h-3" /> Verified Buyer
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-400">{review.date}</span>
                                    </div>
                                    <div className="flex text-yellow-400 text-sm mb-2">
                                        {[...Array(review.rating)].map((_, i) => <span key={i}>★</span>)}
                                    </div>
                                    <h4 className="font-bold text-sm text-black mb-1">{review.title}</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* Sticky Mobile Add to Cart */}
            <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-40 md:hidden transition-transform duration-300 flex items-center justify-between gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] ${
                // Use intersection observer state or simple scroll logic
                // For simplicity here, we'll assume it shows always if we aren't near the top, 
                // but let's implement the scroll logic properly in next step if needed. 
                // For now, let's make it show always for testing, or better yet, let's add the ref.
                "translate-y-0"
                }`}>
                <div className="flex flex-col">
                    <span className="font-bold text-sm text-black leading-tight line-clamp-1">{product.name}</span>
                    <span className="text-xs text-gray-500">{product.price} {product.currency}</span>
                </div>
                <Button
                    onClick={handleAddToCart}
                    className="h-10 px-6 bg-black text-white rounded-full font-bold uppercase text-xs tracking-wide hover:bg-gray-800"
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}
