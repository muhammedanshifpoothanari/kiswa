"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ShoppingBag, Minus, Plus, Trash2, Check } from "lucide-react"
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
                <h1 className="text-5xl font-bold uppercase tracking-tight mb-4">Your bag is empty</h1>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Add something to your bag to continue</p>
                <Button asChild className="h-16 px-12 bg-black text-white font-black uppercase tracking-widest text-xs">
                    <Link href="/products">BROWSE PRODUCTS</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1400px] mx-auto px-6 py-20 lg:py-32">
                <div className="grid lg:grid-cols-[1fr_450px] gap-12 lg:gap-20 items-start">

                    {/* Checkout Details (Left) */}
                    <div className="space-y-12">
                        <div className="space-y-2">
                            <h1 className="text-4xl lg:text-7xl font-bold uppercase tracking-tight">Checkout</h1>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secure selection & Order verification</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-12 max-w-2xl">
                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-2 inline-block">1. Personal Details</h2>
                                    <div className="grid gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName" className="text-xs font-black uppercase tracking-widest text-black">Full Name</Label>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                required
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="AHMED AL-SAUD"
                                                className="w-full h-14 bg-gray-100 px-6 font-bold uppercase text-sm border-2 border-transparent focus:border-black focus:bg-white outline-none transition-all placeholder:text-gray-300"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-2 inline-block">2. Phone Verification</h2>
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="flex-1 space-y-2">
                                                <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-black">Phone Number (+966)</Label>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="5XXXXXXXX"
                                                    disabled={otpState.verified}
                                                    className="w-full h-14 bg-gray-100 px-6 font-bold uppercase text-sm border-2 border-transparent focus:border-black focus:bg-white outline-none transition-all placeholder:text-gray-300 disabled:opacity-50"
                                                />
                                            </div>
                                            {!otpState.verified && (
                                                <button
                                                    type="button"
                                                    onClick={handleVerifyPhone}
                                                    disabled={otpState.isLoading || !formData.phone}
                                                    className="mt-6 h-14 px-8 bg-black text-white font-black uppercase tracking-widest text-xs disabled:opacity-50"
                                                >
                                                    {otpState.isLoading ? "..." : "SEND CODE"}
                                                </button>
                                            )}
                                        </div>

                                        {otpState.sent && !otpState.verified && (
                                            <div className="bg-gray-50 p-6 space-y-4 scale-in-center">
                                                <p className="text-xs font-black uppercase tracking-widest text-black">Enter WhatsApp Verification Code</p>
                                                <div className="flex gap-4">
                                                    <input
                                                        value={otpState.inputCode}
                                                        onChange={(e) => setOtpState(prev => ({ ...prev, inputCode: e.target.value }))}
                                                        placeholder="XXXX"
                                                        maxLength={6}
                                                        className="w-full h-12 bg-white px-6 font-black tracking-[0.5em] text-center text-lg border-2 border-black outline-none"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleVerifyCode}
                                                        className="h-12 px-8 bg-black text-white font-black uppercase tracking-widest text-xs"
                                                    >
                                                        VERIFY
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {otpState.verified && (
                                            <div className="flex items-center gap-3 text-green-600 font-black text-[10px] uppercase tracking-widest">
                                                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                                                    <Check className="h-3 w-3 text-white" />
                                                </div>
                                                Number Verified
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !otpState.verified}
                                    className="w-full h-16 bg-black text-white hover:bg-[#333] font-black uppercase tracking-widest text-xs"
                                >
                                    {isSubmitting ? "PROCESSING..." : "PLACE ORDER VIA WHATSAPP"}
                                </Button>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center mt-6 leading-loose">
                                    Payment is CASH ON DELIVERY. One of our specialists will confirm your order details on WhatsApp shortly after placement.
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary (Right) */}
                    <div className="sticky top-32 space-y-8">
                        <div className="bg-gray-100 p-8 space-y-8">
                            <h2 className="text-xl font-black uppercase tracking-tight font-heading border-b border-gray-200 pb-4">In your bag</h2>

                            <div className="space-y-6 max-h-[500px] overflow-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex gap-4">
                                        <div className="w-20 h-28 bg-white overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div className="space-y-1">
                                                <h3 className="text-[11px] font-black uppercase tracking-tight leading-none">{item.product.name}</h3>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.product.category}</p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center border border-gray-200 h-8">
                                                    <button onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))} className="px-2 hover:bg-black hover:text-white h-full transition-colors font-bold text-xs">-</button>
                                                    <span className="w-6 text-center text-[10px] font-black">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 hover:bg-black hover:text-white h-full transition-colors font-bold text-xs">+</button>
                                                </div>
                                                <p className="text-[11px] font-black">{item.product.price * item.quantity} {item.product.currency}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                    <span>Subtotal</span>
                                    <span>{total} SAR</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                    <span>Delivery</span>
                                    <span className="text-black">FREE</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-black">
                                    <span className="text-sm font-black uppercase tracking-widest">Total</span>
                                    <span className="text-xl font-black">{total} SAR</span>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 text-center space-y-1">
                                <p className="text-[9px] font-black uppercase tracking-widest">Secure Checkout</p>
                            </div>
                            <div className="bg-gray-50 p-4 text-center space-y-1">
                                <p className="text-[9px] font-black uppercase tracking-widest">Fast Delivery</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
