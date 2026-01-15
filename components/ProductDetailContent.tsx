"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Zap, Check, ChevronLeft, ChevronRight, MoreHorizontal, ShoppingBag, ShieldCheck } from "lucide-react"
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
                    // setIsVerificationModalOpen(true) // Open if expired - REMOVED for better UX
                }
            } else {
                setIsVerified(false)
                // setIsVerificationModalOpen(true) // Open if never verified - REMOVED for better UX
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

            {/* --- MOBILE LAYOUT (Visible < md) --- */}
            <div className="md:hidden">

                {/* Mobile Content */}
                <div className="pt-24 pb-32 px-6 min-h-screen bg-[#FDFBF9]"> {/* Beige/White mix background */}

                    {/* Hero Image */}
                    <div className="relative w-full aspect-square mb-12 flex items-center justify-center">
                        <div className="absolute inset-x-4 bottom-0 h-[20%] bg-black/5 blur-2xl rounded-full" /> {/* Shadow */}
                        <img
                            src={product.images[selectedImage]}
                            alt={product.name}
                            className="relative w-[95%] h-full object-contain z-10 drop-shadow-xl"
                        />
                        {/* Rotation Indicator Simulator */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[200px] h-1 bg-gradient-to-r from-transparent via-purple-900/20 to-transparent flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-white border border-purple-900/30 flex items-center justify-center shadow-sm">
                                <div className="w-1 h-3 bg-purple-900/50 rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Title & Desc */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-black tracking-tight mb-3">
                            {product.name}
                        </h1>
                        <p className="text-sm text-gray-500 leading-relaxed font-light">
                            {product.description}
                        </p>
                    </div>

                    {/* Image/View Selector */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-black">Views</h3>
                            <p className="text-xs text-gray-400 font-medium">Tap to view</p>
                        </div>
                        <div className="flex gap-4">
                            {product.images.map((img: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`w-14 h-14 rounded-full border-2 p-0.5 overflow-hidden transition-all hover:scale-105 ${selectedImage === i
                                        ? 'border-gray-900 scale-110 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-400'
                                        }`}
                                >
                                    <img src={img} className="w-full h-full rounded-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Features & Details */}
                    {product.features && product.features.length > 0 && (
                        <div className="mb-8 bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-bold text-black mb-6">Product Features</h3>
                            <div className="space-y-4">
                                {product.features.map((feature: string, index: number) => (
                                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-medium text-gray-700 leading-relaxed flex-1">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Similar Products */}
                    {relatedProducts && relatedProducts.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-black mb-6">You May Also Like</h3>
                            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory">
                                {relatedProducts.map((relatedProduct: any) => (
                                    <a
                                        key={relatedProduct.id}
                                        href={`/products/${relatedProduct.id}`}
                                        className="flex-shrink-0 w-[70%] snap-start group"
                                    >
                                        <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                            {/* Image */}
                                            <div className="relative aspect-square bg-gray-50 overflow-hidden">
                                                <img
                                                    src={relatedProduct.images[0]}
                                                    alt={relatedProduct.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            {/* Info */}
                                            <div className="p-4">
                                                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                                                    {relatedProduct.category}
                                                </p>
                                                <h4 className="text-sm font-bold text-black mb-2 line-clamp-2 leading-tight">
                                                    {relatedProduct.name}
                                                </h4>
                                                <p className="text-lg font-bold text-black">
                                                    {relatedProduct.price} <span className="text-xs text-gray-400 font-normal">{relatedProduct.currency}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Bottom Bar - Refined Premium */}
                <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/95 backdrop-blur-2xl border-t border-gray-100/50 z-50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-black tracking-tighter">
                                {product.price}
                                <span className="text-[10px] font-medium text-gray-400 align-top ml-1 tracking-widest uppercase">{product.currency}</span>
                            </span>
                        </div>
                        {/* Premium Trust Badge */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-100 bg-gray-50/50">
                            <ShieldCheck className="w-3 h-3 text-black" />
                            <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">Verified Secure</span>
                        </div>
                    </div>

                    <div className="flex gap-3 relative">
                        {/* Add to Cart - Elegant Secondary */}
                        <Button
                            onClick={handleAddToCart}
                            variant="outline"
                            className="flex-1 h-12 rounded-full border-gray-200 text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-50 transition-all active:scale-95"
                        >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            To Cart
                        </Button>

                        {/* Buy Now - Primary with Guiding Light */}
                        <div className="flex-1 relative group">
                            {/* Priority Badge - Subtle */}
                            <div className="absolute -top-2 right-4 bg-black text-white text-[7px] font-bold px-2 py-0.5 rounded-full z-10 uppercase tracking-[0.2em] border border-white/20 shadow-sm">
                                Priority
                            </div>

                            <Button
                                onClick={handleBuyNow}
                                className="w-full h-12 bg-black text-white rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all hover:bg-black/90 active:scale-95 relative overflow-hidden shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)]"
                            >
                                <span className="flex items-center justify-center">
                                    Buy Now
                                    <ChevronRight className="w-4 h-4 ml-1 opacity-50 group-hover:translate-x-0.5 transition-transform" />
                                </span>
                            </Button>

                            {/* Guiding Light - Subtle breathing border glow */}
                            <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-green-400/20 via-blue-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10 animate-pulse-slow"></div>
                        </div>
                    </div>

                    {/* First-time user hint - like Duolingo's tooltips */}
                    {/* <div className="mt-3 flex items-start gap-2 bg-blue-50 px-3 py-2 rounded-xl border border-blue-100">
                        <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-blue-900 mb-0.5">💡 Quick Tip</p>
                            <p className="text-xs text-blue-700 leading-relaxed">
                                <span className="font-bold">Buy Now</span> takes you straight to checkout. <span className="font-bold">Add to Cart</span> to keep shopping.
                            </p>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* --- DESKTOP LAYOUT (Hidden < md) --- */}
            <section className="hidden md:block pt-24 lg:pt-32 pb-24 px-4 lg:px-8">
                <div className="max-w-[1800px] mx-auto">
                    <BackButton className="mb-12 opacity-50 hover:opacity-100 transition-opacity" />

                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-32">
                        {/* Images Section - The Gallery */}
                        <div className="space-y-4 lg:sticky lg:top-32 lg:self-start lg:h-[calc(100vh-10rem)] lg:overflow-y-auto no-scrollbar">
                            {/* Main Image */}
                            <div className="aspect-[3/4] overflow-hidden bg-[#F5F5F7] rounded-[2rem]">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover animate-[scaleIn_1.2s_cubic-bezier(0.22,1,0.36,1)]"
                                />
                            </div>

                            {/* Thumbnails - Now Scrollable Row on Mobile, Grid on Desktop */}
                            {product.images.length > 1 && (
                                <div className="flex lg:grid lg:grid-cols-4 gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar snap-x snap-mandatory">
                                    {product.images.map((image: string, index: number) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`relative flex-shrink-0 w-24 lg:w-auto aspect-[3/4] overflow-hidden bg-[#F5F5F7] rounded-xl transition-all duration-300 snap-start
                                                ${selectedImage === index ? 'ring-1 ring-black ring-offset-2' : 'opacity-70 hover:opacity-100'}
                                            `}
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

                        {/* Info Section - The Story */}
                        <div className="flex flex-col justify-center lg:min-h-[80vh]">
                            <div className="space-y-8 max-w-xl">
                                <div>
                                    <p className="text-xs font-bold tracking-[0.2em] text-gray-400 mb-6 uppercase">
                                        {product.category}
                                    </p>
                                    <h1 className="text-5xl md:text-7xl font-medium text-black tracking-tighter leading-[0.9] mb-8">
                                        {product.name}
                                    </h1>
                                    <p className="text-3xl font-light text-black tracking-tight flex items-baseline gap-2">
                                        {product.price} <span className="text-sm text-gray-400 font-medium">{product.currency}</span>
                                    </p>
                                </div>

                                <div className="h-px bg-gray-100" />

                                <p className="text-lg text-gray-500 leading-relaxed font-light">
                                    {product.description}
                                </p>

                                <div className="space-y-6 pt-8">
                                    {product.features.map((feature: string, index: number) => (
                                        <div key={index} className="flex gap-4 items-start">
                                            <span className="text-xs font-bold text-black pt-1">0{index + 1}</span>
                                            <p className="text-sm text-gray-500 leading-relaxed">{feature}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Purchase Actions */}
                                <div className="pt-12 space-y-6">
                                    {product.inStock ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-6 p-1 border border-gray-100 rounded-full w-fit">
                                                <button
                                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors"
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                >
                                                    <Minus className="h-4 w-4 stroke-[1.5]" />
                                                </button>
                                                <span className="w-8 text-center font-medium text-sm tabular-nums">{quantity}</span>
                                                <button
                                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors"
                                                    onClick={() => setQuantity(quantity + 1)}
                                                >
                                                    <Plus className="h-4 w-4 stroke-[1.5]" />
                                                </button>
                                            </div>

                                            <div className="flex gap-4">
                                                <Button
                                                    className="flex-1 h-14 bg-black text-white hover:bg-black/90 rounded-full text-[13px] font-medium tracking-[0.1em] uppercase transition-all shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:scale-[1.02]"
                                                    onClick={inCart ? handleUpdateCart : handleAddToCart}
                                                >
                                                    {inCart ? "Update Bag" : "Add to Bag"}
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Button className="w-full h-14 bg-gray-50 text-gray-400 cursor-not-allowed rounded-full text-[13px] font-medium tracking-[0.1em] uppercase" disabled>
                                            Unavailable
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Minimal Recommendations */}
            {relatedProducts.length > 0 && (
                <section className="hidden md:block py-24 px-6 md:px-8 bg-[#F5F5F7]">
                    <div className="max-w-[1800px] mx-auto">
                        <h2 className="text-2xl font-medium tracking-tight mb-12">Complementary.</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}
