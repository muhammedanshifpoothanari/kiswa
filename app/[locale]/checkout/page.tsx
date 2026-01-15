"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ShoppingBag, Check, Package, Loader2, MapPin, Lock, Shield } from "lucide-react"
import Link from "next/link"
import { useAnalytics } from "@/hooks/use-analytics"
import { createOrder } from "@/app/actions/order"

export default function CheckoutPage() {
    const router = useRouter()
    const { items, getCartTotal, clearCart, updateQuantity } = useCart()
    const { trackEvent } = useAnalytics()
    const total = getCartTotal()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [verifiedUser, setVerifiedUser] = useState<any>(null)

    // Shipping Address Form
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        city: "",
        street: "",
        district: "",
        notes: ""
    })

    // Load Verified User
    useEffect(() => {
        const stored = localStorage.getItem('kiswa_verified_user')
        if (!stored) {
            router.push('/') // Redirect if not verified
            return
        }
        const data = JSON.parse(stored)
        setVerifiedUser(data)
    }, [router])

    // Track Checkout Start
    useEffect(() => {
        if (items.length > 0) {
            trackEvent('checkout_start', {
                metadata: {
                    total,
                    itemCount: items.length
                }
            })
        }
    }, [items, total, trackEvent])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const orderPayload = {
                items,
                total,
                customerInfo: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: verifiedUser.method === 'phone' ? verifiedUser.contact : undefined,
                    email: verifiedUser.method === 'email' ? verifiedUser.contact : undefined
                },
                shippingAddress: {
                    city: formData.city,
                    street: formData.street,
                    country: 'Saudi Arabia'
                },
                paymentMethod: 'COD'
            }

            const result = await createOrder(orderPayload);

            if (result.success) {
                clearCart()
                // Redirect to success page with order number
                router.push(`/checkout/success?orderNumber=${result.orderNumber}`)
            } else {
                alert("Failed to create order: " + result.error)
            }
        } catch (error) {
            console.error("Order submission error:", error)
            alert("Something went wrong. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background pt-32 px-6 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-8">
                    <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                </div>
                <h1 className="text-xl font-medium mb-4">Your bag is empty.</h1>
                <Button asChild className="h-12 px-8 bg-primary text-primary-foreground font-medium rounded-full hover:opacity-90 transition-opacity">
                    <Link href="/products">Browse Collection</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 pt-24 pb-32">
                {/* Progress Indicator - Minimalist Premium */}
                <div className="mb-12">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">01 Bag</span>
                            <div className="w-12 h-[1px] bg-black"></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">02 Checkout</span>
                            <div className="w-12 h-[1px] bg-black"></div>
                        </div>
                        <div className="flex items-center gap-2 opacity-20">
                            <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">03 Payment</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-16 xl:gap-24 items-start">

                    {/* Left Column: The Input */}
                    <div className="w-full space-y-8 lg:space-y-16 animate-fade-in">

                        {/* Header */}
                        <div className="space-y-2">
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Return
                            </Link>
                            <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground">
                                Checkout
                            </h1>
                        </div>

                        {/* Verified User Badge - Monochrome Premium */}
                        {verifiedUser && (
                            <div className="flex items-center gap-3 bg-gray-50 p-2 pr-5 rounded-full w-fit border border-gray-100 shadow-sm animate-fade-in">
                                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                                    <Check className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black">Verified Identity</p>
                                    <p className="text-[9px] text-gray-400 uppercase tracking-widest font-medium">{verifiedUser.contact}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-12">
                            {/* Shipping Section */}
                            <div className="space-y-6 lg:space-y-8">
                                <h2 className="text-xs font-bold uppercase text-muted-foreground tracking-[0.2em] ml-2">Shipping Information</h2>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="sr-only">First Name</Label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full h-14 lg:h-16 bg-secondary px-6 lg:px-8 text-base text-foreground rounded-[2rem] focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-muted-foreground/40 font-medium"
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="sr-only">Last Name</Label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full h-14 lg:h-16 bg-secondary px-6 lg:px-8 text-base text-foreground rounded-[2rem] focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-muted-foreground/40 font-medium"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="city" className="sr-only">City</Label>
                                    <input
                                        id="city"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="City"
                                        className="w-full h-14 lg:h-16 bg-secondary px-6 lg:px-8 text-base text-foreground rounded-[2rem] focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-muted-foreground/40 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="street" className="sr-only">Street Address</Label>
                                    <input
                                        id="street"
                                        name="street"
                                        required
                                        value={formData.street}
                                        onChange={handleInputChange}
                                        placeholder="Street Address"
                                        className="w-full h-14 lg:h-16 bg-secondary px-6 lg:px-8 text-base text-foreground rounded-[2rem] focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-muted-foreground/40 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="district" className="sr-only">District</Label>
                                    <input
                                        id="district"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        placeholder="District (Optional)"
                                        className="w-full h-14 lg:h-16 bg-secondary px-6 lg:px-8 text-base text-foreground rounded-[2rem] focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-muted-foreground/40 font-medium"
                                    />
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-[0.2em] ml-2">Payment</h3>
                                <div className="bg-secondary p-6 lg:p-8 rounded-[2rem] border border-transparent hover:border-black/5 transition-all">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-sm uppercase tracking-wider">Cash on Delivery</span>
                                        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white">
                                            <Check className="h-3 w-3" />
                                        </div>
                                    </div>
                                    <p className="text-xs font-medium text-muted-foreground mt-2 uppercase tracking-wide opacity-60">
                                        Pay securely when your order arrives.
                                    </p>
                                </div>
                            </div>

                            {/* Premium Place Order Button with Guiding Light */}
                            <div className="relative group">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="relative w-full h-14 lg:h-16 bg-black text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-full transition-all disabled:opacity-50 shadow-xl shadow-black/10 overflow-hidden active:scale-[0.98]"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <span className="relative flex items-center gap-2">
                                            <Lock className="w-3.5 h-3.5 opacity-50" />
                                            Confirm Order Securely
                                        </span>
                                    )}
                                </Button>
                                {/* Guiding Light */}
                                {!isSubmitting && (
                                    <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-green-400/20 via-blue-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md -z-10 animate-pulse-slow"></div>
                                )}
                            </div>

                            <div className="mt-8 flex items-center justify-center py-4 border-t border-gray-100">
                                <div className="flex items-center gap-3 opacity-30">
                                    <Shield className="w-3 h-3 text-black" />
                                    <span className="text-[8px] font-bold uppercase tracking-[0.4em]">Encrypted Handshake</span>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: The Summary ("Glass") */}
                    <div className="w-full lg:sticky lg:top-12 animate-fade-in delay-200">
                        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-[2.5rem] lg:rounded-[3rem] p-6 lg:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.04)] ring-1 ring-white/60 dark:ring-white/10 border border-white/50">
                            <h2 className="text-base lg:text-lg font-bold uppercase tracking-tight mb-6 lg:mb-8">Order Summary</h2>

                            <div className="space-y-4 lg:space-y-6 max-h-[50vh] lg:max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex gap-4 lg:gap-5">
                                        <div className="w-16 h-20 lg:w-20 lg:h-24 bg-secondary rounded-[1.25rem] overflow-hidden flex-shrink-0 border border-white/50">
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                                            />
                                        </div>
                                        <div className="flex-1 py-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-xs font-bold uppercase tracking-wider leading-tight w-[70%] lg:w-[80%] truncate">{item.product.name}</h3>
                                                <p className="text-xs font-bold whitespace-nowrap">
                                                    {(item.product.price * item.quantity).toLocaleString()} <span className="text-[10px] text-muted-foreground font-normal">{item.product.currency}</span>
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center bg-white/50 rounded-full h-7 px-1 ring-1 ring-black/5">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                                                        className="w-6 h-full flex items-center justify-center rounded-full hover:bg-white text-xs transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-6 text-center text-[10px] font-bold tabular-nums">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="w-6 h-full flex items-center justify-center rounded-full hover:bg-white text-xs transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="h-px bg-border w-full my-6 lg:my-8" />

                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground uppercase tracking-wide text-xs font-medium">Subtotal</span>
                                    <span className="font-bold tracking-wide">{total.toLocaleString()} SAR</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground uppercase tracking-wide text-xs font-medium">Shipping</span>
                                    <span className="text-muted-foreground text-xs">Calculated next</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 mt-4 text-lg lg:text-xl font-semibold border-t border-gray-100">
                                    <span className="uppercase tracking-wide">Total</span>
                                    <span>{total.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">SAR</span></span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 lg:mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground uppercase tracking-widest opacity-60">
                            <Check className="h-3 w-3" />
                            <span>Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
