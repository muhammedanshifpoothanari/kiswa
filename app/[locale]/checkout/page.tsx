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
            <div className="min-h-screen bg-white pt-32 px-6 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-gray-100 flex items-center justify-center mb-8 rotate-45">
                    <ShoppingBag className="h-10 w-10 text-black -rotate-45" />
                </div>
                <h1 className="text-xl font-bold mb-4 uppercase">Your bag is empty</h1>
                <p className="text-xs text-gray-400 mb-8 uppercase font-bold tracking-wide">Add something to your bag to continue</p>
                <Button asChild className="h-12 px-8 bg-black text-white font-bold uppercase tracking-wider rounded-full">
                    <Link href="/products">Browse Products</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1400px] mx-auto px-6 py-20 lg:py-32">
                <div className="grid lg:grid-cols-[1fr_450px] gap-12 lg:gap-24 items-start">

                    {/* Checkout Details (Left) */}
                    <div className="space-y-16 animate-fade-in">
                        <div className="space-y-4">
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-2"
                            >
                                <ArrowLeft className="h-3 w-3" />
                                Back to Bag
                            </Link>
                            <h1 className="text-3xl font-bold tracking-normal uppercase">Checkout</h1>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Securely place your order</p>
                        </div>

                        {verifiedUser && (
                            <div className="bg-green-50 border border-green-100 p-4 rounded-lg flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                                    <Check className="w-4 h-4" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-bold text-green-800">Identity Verified</p>
                                    <p className="text-green-600">{verifiedUser.contact}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-16 max-w-2xl">
                            <div className="space-y-8">
                                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b pb-2 inline-block">01. Shipping Address</h2>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="firstName" className="text-[10px] font-bold uppercase tracking-wider text-gray-500">First Name</Label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full h-12 bg-gray-50 px-4 font-medium text-sm border rounded focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="lastName" className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Last Name</Label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full h-12 bg-gray-50 px-4 font-medium text-sm border rounded focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="city" className="text-[10px] font-bold uppercase tracking-wider text-gray-500">City</Label>
                                    <input
                                        id="city"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Riyadh"
                                        className="w-full h-12 bg-gray-50 px-4 font-medium text-sm border rounded focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="street" className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Street Address</Label>
                                    <input
                                        id="street"
                                        name="street"
                                        required
                                        value={formData.street}
                                        onChange={handleInputChange}
                                        placeholder="Building No, Street Name"
                                        className="w-full h-12 bg-gray-50 px-4 font-medium text-sm border rounded focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="district" className="text-[10px] font-bold uppercase tracking-wider text-gray-500">District (Optional)</Label>
                                    <input
                                        id="district"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        className="w-full h-12 bg-gray-50 px-4 font-medium text-sm border rounded focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-8">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-16 bg-black text-white hover:bg-gray-800 font-bold uppercase tracking-wider text-sm rounded-full transition-all disabled:opacity-50 shadow-xl shadow-black/10 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isSubmitting ? "Processing Order..." : "Place Order (COD)"}
                                </Button>
                                <div className="mt-8 p-6 bg-gray-50 rounded-lg flex items-start gap-4">
                                    <div className="w-1.5 h-1.5 bg-gray-400 mt-2 rounded-full flex-shrink-0" />
                                    <p className="text-xs font-medium text-gray-500 leading-relaxed">
                                        Payment is Cash on Delivery. One of our specialists will confirm your order details shortly after placement.
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary (Right) */}
                    <div className="sticky top-32 space-y-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <div className="bg-white rounded-xl p-8 space-y-8 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold uppercase tracking-wide pb-4 border-b">Bag Summary</h2>

                            <div className="space-y-8 max-h-[400px] overflow-auto pr-4 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex gap-6">
                                        <div className="w-20 h-24 bg-gray-50 rounded overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div className="space-y-1">
                                                <h3 className="text-xs font-bold uppercase tracking-wide leading-tight">{item.product.name}</h3>
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{item.product.category}</p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center border rounded h-8 px-1">
                                                    <button type="button" onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))} className="w-6 h-full hover:text-gray-400 transition-colors font-medium text-xs">-</button>
                                                    <span className="w-6 text-center text-[11px] font-medium">{item.quantity}</span>
                                                    <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-full hover:text-gray-400 transition-colors font-medium text-xs">+</button>
                                                </div>
                                                <p className="text-sm font-bold tracking-tight">{item.product.price * item.quantity} {item.product.currency}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6 border-t">
                                <div className="flex justify-between items-center text-xs font-medium text-gray-400">
                                    <span>Subtotal</span>
                                    <span>{total} SAR</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-medium text-gray-400">
                                    <span>Delivery</span>
                                    <span className="text-green-500 font-semibold">Free</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t">
                                    <span className="text-sm font-semibold">Total</span>
                                    <span className="text-2xl font-bold">{total} SAR</span>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 text-center rounded-xl border border-gray-100 flex flex-col items-center gap-2">
                                <Check className="h-4 w-4 text-gray-400" />
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Secure</p>
                            </div>
                            <div className="bg-gray-50 p-4 text-center rounded-xl border border-gray-100 flex flex-col items-center gap-2">
                                <Package className="h-4 w-4 text-gray-400" />
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Express</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
