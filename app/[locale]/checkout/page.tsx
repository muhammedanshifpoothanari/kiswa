"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ShoppingBag, Check, Package, Loader2, MapPin } from "lucide-react"
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
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-32">
                <div className="grid lg:grid-cols-[1fr_420px] gap-16 xl:gap-24 items-start">

                    {/* Left Column: The Input */}
                    <div className="space-y-16 animate-fade-in">

                        {/* Header */}
                        <div className="space-y-2">
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Return
                            </Link>
                            <h1 className="text-4xl font-semibold tracking-tight text-foreground">
                                Checkout
                            </h1>
                        </div>

                        {/* Verified User Badge - "The Token" */}
                        {verifiedUser && (
                            <div className="flex items-center gap-4 bg-secondary/50 p-4 pr-6 rounded-full w-fit backdrop-blur-md border border-white/10">
                                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white shadow-lg">
                                    <Check className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">Verified</p>
                                    <p className="text-xs text-muted-foreground">{verifiedUser.contact}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-12">
                            {/* Shipping Section */}
                            <div className="space-y-8">
                                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Shipping</h2>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="sr-only">First Name</Label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            onChange={handleInputChange}
                                            className="w-full h-16 bg-secondary px-6 text-base text-foreground rounded-[1.5rem] focus:ring-2 focus:ring-ring outline-none transition-all placeholder:text-muted-foreground/50"
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
                                            onChange={handleInputChange}
                                            className="w-full h-16 bg-secondary px-6 text-base text-foreground rounded-[1.5rem] focus:ring-2 focus:ring-ring outline-none transition-all placeholder:text-muted-foreground/50"
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
                                        placeholder="City"
                                        className="w-full h-16 bg-secondary px-6 text-base text-foreground rounded-[1.5rem] focus:ring-2 focus:ring-ring outline-none transition-all placeholder:text-muted-foreground/50"
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
                                        placeholder="Street Address"
                                        className="w-full h-16 bg-secondary px-6 text-base text-foreground rounded-[1.5rem] focus:ring-2 focus:ring-ring outline-none transition-all placeholder:text-muted-foreground/50"
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
                                        placeholder="District (Optional)"
                                        className="w-full h-16 bg-secondary px-6 text-base text-foreground rounded-[1.5rem] focus:ring-2 focus:ring-ring outline-none transition-all placeholder:text-muted-foreground/50"
                                    />
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Payment</h3>
                                <div className="bg-secondary p-8 rounded-[1.5rem]">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Cash on Delivery</span>
                                        <Check className="h-5 w-5 text-foreground" />
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Pay securely when your order arrives.
                                    </p>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-16 bg-primary text-primary-foreground hover:opacity-90 font-medium text-lg rounded-full transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    "Place Order"
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Right Column: The Summary ("Glass") */}
                    <div className="sticky top-12 animate-fade-in delay-200">
                        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-[2rem] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] ring-1 ring-white/40 dark:ring-white/10">
                            <h2 className="text-lg font-semibold mb-8">Order Summary</h2>

                            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex gap-4">
                                        <div className="w-16 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                                            />
                                        </div>
                                        <div className="flex-1 py-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-sm font-medium leading-tight">{item.product.name}</h3>
                                                <p className="text-sm font-medium whitespace-nowrap">
                                                    {(item.product.price * item.quantity).toLocaleString()} <span className="text-xs text-muted-foreground">{item.product.currency}</span>
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3 mt-2">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                                                    className="w-6 h-6 flex items-center justify-center bg-secondary rounded-full text-sm hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="text-sm tabular-nums">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="w-6 h-6 flex items-center justify-center bg-secondary rounded-full text-sm hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="h-px bg-border w-full my-8" />

                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>{total.toLocaleString()} SAR</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="text-muted-foreground">Calculated next</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 mt-4 text-xl font-semibold">
                                    <span>Total</span>
                                    <span>{total.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">SAR</span></span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground uppercase tracking-widest opacity-60">
                            <Check className="h-3 w-3" />
                            <span>Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
