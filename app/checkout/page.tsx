"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react"
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
            // Format phone number to E.164 (Assuming SA +966)
            // Remove leading zero if present, then add prefix
            const cleanPhone = formData.phone.replace(/^0+/, "")
            const fullPhone = `+966${cleanPhone}`

            const result = await sendOtp(fullPhone)

            if (result.success) {
                setOtpState(prev => ({
                    ...prev,
                    sent: true,
                    isLoading: false,
                }))
                // alert("Verification code sent to WhatsApp")
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
        if (!otpState.inputCode || otpState.inputCode.length !== 4) { // Twilio default is usually 4-7, we can relax this check or keep it if we configure 4
            // Not strictly enforcing length here for flexibility, but preventing empty
        }

        setOtpState(prev => ({ ...prev, isLoading: true }))

        try {
            const cleanPhone = formData.phone.replace(/^0+/, "")
            const fullPhone = `+966${cleanPhone}`

            const result = await verifyOtp(fullPhone, otpState.inputCode)

            if (result.success) {
                setOtpState(prev => ({
                    ...prev,
                    verified: true,
                    isLoading: false
                }))
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

        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 800))

        // Store order details in sessionStorage for confirmation page
        const orderData = {
            orderNumber: `KISWA-${Date.now()}`,
            items,
            total,
            customerInfo: formData,
            paymentMethod: "COD_WHATSAPP",
            orderDate: new Date().toISOString()
        }
        sessionStorage.setItem("lastOrder", JSON.stringify(orderData))

        // Clear cart
        clearCart()

        // Redirect to success page
        router.push("/checkout/success")
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <div className="max-w-2xl mx-auto px-6 py-20 text-center">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h1 className="text-3xl font-medium mb-4">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-8">Add some products before checking out</p>
                    <Button asChild>
                        <Link href="/products">Browse Products</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Back Button */}
            <section className="pt-32 pb-6 px-6 border-b border-border">
                <div className="max-w-xl mx-auto">
                    <Button variant="ghost" asChild className="rounded-full">
                        <Link href="/products">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Continue Shopping
                        </Link>
                    </Button>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Order Summary (Left Column) */}
                    <div className="space-y-6 order-2 lg:order-1">
                        <div className="bg-secondary/30 rounded-3xl p-8 border border-border">
                            <h2 className="text-2xl font-medium mb-6 flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                Order Summary
                            </h2>

                            <div className="grid grid-cols-[1fr_auto] gap-4 mb-4 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                <span>Product</span>
                                <span>Price</span>
                            </div>

                            <div className="space-y-6 max-h-[600px] overflow-auto px-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex gap-4 items-center bg-background p-4 rounded-xl border border-border/50 group">
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-sm text-foreground line-clamp-1">
                                                {item.product.name}
                                            </h3>
                                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1 mb-2">
                                                {item.product.category}
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                                                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white text-muted-foreground hover:text-foreground transition-colors"
                                                        type="button"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white text-muted-foreground hover:text-foreground transition-colors"
                                                        type="button"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                                                    type="button"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-right self-start mt-1">
                                            <p className="font-medium text-sm whitespace-nowrap">
                                                {item.product.price * item.quantity} <span className="text-[10px] text-muted-foreground">SAR</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-border/50 space-y-3">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>{total} SAR</span>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-lg font-medium pt-3 border-t border-border/50 text-foreground">
                                    <span>Total</span>
                                    <span>{total} SAR</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form (Right Column) */}
                    <div className="order-1 lg:order-2 sticky top-32">
                        <div className="bg-background rounded-3xl p-8 border border-border shadow-sm">
                            <h1 className="text-3xl font-medium tracking-tight mb-2">Quick Checkout</h1>
                            <p className="text-muted-foreground mb-8 text-sm">
                                Enter your details to complete the order via WhatsApp.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="firstName">Full Name</Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            placeholder="e.g. Ahmed Al-Saud"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="h-12 text-lg mt-1.5"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <div className="flex gap-3 mt-1.5">
                                            <div className="relative flex-1">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium border-r border-border pr-2 h-5 flex items-center">
                                                    +966
                                                </span>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    placeholder="5xxxxxxxx"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="h-12 text-lg pl-20"
                                                    disabled={otpState.verified}
                                                />
                                            </div>
                                            {!otpState.verified && (
                                                <Button
                                                    type="button"
                                                    onClick={handleVerifyPhone}
                                                    disabled={otpState.isLoading || !formData.phone}
                                                    className="h-12 px-6"
                                                    variant="secondary"
                                                >
                                                    {otpState.isLoading ? "Sending..." : "Verify"}
                                                </Button>
                                            )}
                                        </div>

                                        {/* OTP Verification Section */}
                                        {otpState.sent && !otpState.verified && (
                                            <div className="mt-4 p-4 bg-secondary/30 rounded-xl border border-border">
                                                <Label className="text-xs mb-2 block">Enter SMS Code</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        value={otpState.inputCode}
                                                        onChange={(e) => setOtpState(prev => ({ ...prev, inputCode: e.target.value }))}
                                                        placeholder="Enter code"
                                                        className="h-10 text-center tracking-widest"
                                                        maxLength={6}
                                                    />
                                                    <Button
                                                        type="button"
                                                        onClick={handleVerifyCode}
                                                        className="h-10"
                                                    >
                                                        Confirm
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {otpState.verified && (
                                            <div className="mt-2 text-green-600 text-sm flex items-center gap-2 font-medium">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                                Phone Number Verified
                                            </div>
                                        )}

                                        {!otpState.verified && !otpState.sent && (
                                            <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1.5">
                                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                                Verify number to receive order updates
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full h-14 text-lg font-bold rounded-xl"
                                        disabled={isSubmitting || !otpState.verified}
                                    >
                                        {isSubmitting ? "Processing..." : "Complete Order via WhatsApp"}
                                    </Button>
                                    <p className="text-center text-[11px] text-muted-foreground mt-4 leading-normal max-w-xs mx-auto">
                                        Payment is <strong>Cash on Delivery</strong>. You will verify the details on WhatsApp before shipping.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
