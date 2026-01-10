"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ShoppingBag, Minus, Plus, Trash2, Check, Package } from "lucide-react"
import Link from "next/link"
import { sendOtp, verifyOtp } from "@/app/actions/otp"

export default function CheckoutPage() {
    const router = useRouter()
    const { items, getCartTotal, clearCart, updateQuantity, removeFromCart } = useCart()
    const total = getCartTotal()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        phone: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const [otpState, setOtpState] = useState({
        sent: false,
        verified: false,
        code: "",
        inputCode: "",
        isLoading: false
    })

    const handleVerifyPhone = async () => {
        if (!formData.phone || formData.phone.length < 9) {
            alert("Please enter a valid phone number first")
            return
        }

        setOtpState(prev => ({ ...prev, isLoading: true }))

        try {
            const cleanPhone = formData.phone.replace(/^0+/, "")
            const fullPhone = `+966${cleanPhone}`
            const result = await sendOtp(fullPhone)
            if (result.success) {
                setOtpState(prev => ({ ...prev, sent: true, isLoading: false }))
            } else {
                alert(result.error || "Failed to send code")
                setOtpState(prev => ({ ...prev, isLoading: false }))
            }
        } catch (error) {
            alert("An error occurred. Please try again.")
            setOtpState(prev => ({ ...prev, isLoading: false }))
        }
    }

    const handleVerifyCode = async () => {
        setOtpState(prev => ({ ...prev, isLoading: true }))
        try {
            const cleanPhone = formData.phone.replace(/^0+/, "")
            const fullPhone = `+966${cleanPhone}`
            const result = await verifyOtp(fullPhone, otpState.inputCode)
            if (result.success) {
                setOtpState(prev => ({ ...prev, verified: true, isLoading: false }))
            } else {
                alert(result.error || "Invalid code")
                setOtpState(prev => ({ ...prev, isLoading: false }))
            }
        } catch (error) {
            alert("Verification failed. Please try again.")
            setOtpState(prev => ({ ...prev, isLoading: false }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!otpState.verified) {
            alert("Please verify your phone number first")
            return
        }
        setIsSubmitting(true)
        await new Promise(resolve => setTimeout(resolve, 800))
        const orderData = {
            orderNumber: `KISWA-${Date.now()}`,
            items,
            total,
            customerInfo: formData,
            paymentMethod: "COD_WHATSAPP",
            orderDate: new Date().toISOString()
        }
        sessionStorage.setItem("lastOrder", JSON.stringify(orderData))
        clearCart()
        router.push("/checkout/success")
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
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Securely place your order via WhatsApp</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-16 max-w-2xl">
                            <div className="space-y-12">
                                <div className="space-y-8">
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b pb-2 inline-block">01. Personal Details</h2>
                                    <div className="grid gap-8">
                                        <div className="space-y-3">
                                            <Label htmlFor="firstName" className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Full Name</Label>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                required
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="Enter your full name"
                                                className="w-full h-14 bg-gray-50 px-6 font-medium text-sm border rounded focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-gray-300"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b pb-2 inline-block">02. Phone Verification</h2>
                                    <div className="space-y-6">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <div className="flex-1 space-y-3">
                                                <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Phone Number (+966)</Label>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="5XXXXXXXX"
                                                    disabled={otpState.verified}
                                                    className="w-full h-14 bg-gray-50 px-6 font-medium text-sm border rounded focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-gray-300 disabled:opacity-50"
                                                />
                                            </div>
                                            {!otpState.verified && (
                                                <button
                                                    type="button"
                                                    onClick={handleVerifyPhone}
                                                    disabled={otpState.isLoading || !formData.phone}
                                                    className="sm:mt-7 h-14 px-8 bg-black text-white font-bold uppercase tracking-wide text-xs rounded-full disabled:opacity-50 hover:bg-gray-800 transition-all shadow-sm"
                                                >
                                                    {otpState.isLoading ? "..." : "Send Code"}
                                                </button>
                                            )}
                                        </div>

                                        {otpState.sent && !otpState.verified && (
                                            <div className="bg-gray-50 p-6 rounded-lg space-y-4 animate-scale-in">
                                                <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Enter WhatsApp Verification Code</p>
                                                <div className="flex gap-3">
                                                    <input
                                                        value={otpState.inputCode}
                                                        onChange={(e) => setOtpState(prev => ({ ...prev, inputCode: e.target.value }))}
                                                        placeholder="••••"
                                                        maxLength={6}
                                                        className="flex-1 h-12 bg-white px-4 font-semibold tracking-[0.5em] text-center text-lg border rounded outline-none"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleVerifyCode}
                                                        className="h-12 px-6 bg-black text-white font-bold uppercase tracking-wide text-xs rounded-full hover:bg-gray-800 transition-all"
                                                    >
                                                        Verify
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {otpState.verified && (
                                            <div className="flex items-center gap-3 text-green-600 font-medium text-xs bg-green-50 p-4 border border-green-100 rounded">
                                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                    <Check className="h-3 w-3 text-white" />
                                                </div>
                                                <span className="uppercase tracking-wide font-bold">Number Verified Successfully</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !otpState.verified}
                                    className="w-full h-16 bg-black text-white hover:bg-gray-800 font-bold uppercase tracking-wider text-sm rounded-full transition-all disabled:opacity-50 shadow-xl shadow-black/10"
                                >
                                    {isSubmitting ? "Processing..." : "Place Order via WhatsApp"}
                                </Button>
                                <div className="mt-8 p-6 bg-gray-50 rounded-lg flex items-start gap-4">
                                    <div className="w-1.5 h-1.5 bg-gray-400 mt-2 rounded-full flex-shrink-0" />
                                    <p className="text-xs font-medium text-gray-500 leading-relaxed">
                                        Payment is Cash on Delivery. One of our specialists will confirm your order details on WhatsApp shortly after placement.
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
                                                    <button onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))} className="w-6 h-full hover:text-gray-400 transition-colors font-medium text-xs">-</button>
                                                    <span className="w-6 text-center text-[11px] font-medium">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-full hover:text-gray-400 transition-colors font-medium text-xs">+</button>
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
