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

            {/* Main Content - The Studio */}
            <section className="pt-24 lg:pt-32 pb-24 px-4 lg:px-8">
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
                <section className="py-24 px-6 md:px-8 bg-[#F5F5F7]">
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
