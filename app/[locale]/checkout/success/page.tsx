"use client"

import { useEffect, useState } from "react"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package, ShoppingBag, ArrowRight, Share2, Star, Zap, Clock, Truck, Check } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getOrderByNumber } from "@/app/actions/order"
import { OrderSuccessSkeleton } from "@/components/skeletons/OrderSuccessSkeleton"
import { motion, AnimatePresence } from "framer-motion"

export default function SuccessPage() {
    const { clearCart } = useCart()
    const searchParams = useSearchParams()
    const orderNumber = searchParams.get("orderNumber")

    const [order, setOrder] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if (orderNumber) {
            clearCart()
            getOrderByNumber(orderNumber)
                .then((data) => {
                    if (data) {
                        setOrder(data)
                    } else {
                        setError("Order not found.")
                    }
                })
                .catch((err) => {
                    console.error("Failed to fetch order:", err)
                    setError("Could not load order details.")
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
            setError("No order number provided.")
        }
    }, [orderNumber])

    if (loading) {
        return <OrderSuccessSkeleton />
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6 font-bold">
                        <ShoppingBag className="h-8 w-8 text-red-500" />
                    </div>
                    <h1 className="text-xl font-bold uppercase tracking-wide mb-2 text-black">Order Not Found</h1>
                    <p className="text-sm text-gray-500 mb-8 font-medium">{error}</p>
                    <Button asChild className="rounded-full bg-black text-white hover:bg-gray-800 font-bold px-8">
                        <Link href="/">Return to Store</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const timelineSteps = [
        { icon: CheckCircle2, label: "Order Placed", status: "completed", date: new Date(order.orderDate).toLocaleDateString() },
        { icon: Clock, label: "Verification", status: "current", desc: "Shorty on WhatsApp" },
        { icon: Package, label: "Preparation", status: "upcoming" },
        { icon: Truck, label: "Delivery", status: "upcoming" }
    ]

    return (
        <div className="min-h-screen bg-white overflow-hidden pb-20">
            {/* Celebration Area */}
            <section className="relative pt-32 pb-16 px-6 bg-gradient-to-b from-green-50/50 to-white">
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black mb-8 shadow-sm"
                    >
                        <Check className="h-8 w-8 text-white stroke-[2.5px]" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4 text-black"
                    >
                        Order Confirmed
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-gray-400 mb-12 max-w-md mx-auto leading-relaxed font-medium uppercase tracking-widest"
                    >
                        Thank you for choosing Kiswa. Your order is being processed with the utmost care.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Button
                            className="h-12 px-8 rounded-full bg-black hover:bg-black/90 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm transition-all active:scale-95 flex items-center gap-2"
                            onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000'}?text=Hello, I just placed order ${order.orderNumber}. Can you please confirm?`, '_blank')}
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Confirm Payment
                        </Button>
                        <Button asChild variant="outline" className="h-12 px-8 rounded-full border border-gray-100 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-50 transition-colors">
                            <Link href="/">
                                Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Progress Visualization */}
            <section className="py-12 px-6">
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-10">Delivery Timeline</h3>
                    <div className="flex justify-between items-start relative">
                        {/* Connecting Line */}
                        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-100 -z-10 mx-6">
                            <div className="h-full bg-green-500 w-[15%] rounded-full"></div>
                        </div>

                        {timelineSteps.map((step, i) => (
                            <div key={i} className="flex flex-col items-center text-center max-w-[80px]">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 border-2 transition-all ${step.status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                                    step.status === 'current' ? 'bg-white border-green-500 text-green-500 shadow-lg scale-110' :
                                        'bg-white border-gray-100 text-gray-300'
                                    }`}>
                                    <step.icon className="w-5 h-5" />
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-tight ${step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'
                                    }`}>{step.label}</span>
                                {step.date && <span className="text-[10px] text-gray-400 font-medium mt-1">{step.date}</span>}
                                {step.desc && <span className="text-[10px] text-green-600 font-bold mt-1 leading-none">{step.desc}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Order Summary & Details */}
            <section className="py-12 px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/[0.03] border border-gray-100">
                        {/* Summary Header */}
                        <div className="bg-gray-50/50 p-8 md:p-12 border-b border-gray-100">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-3">Order Number</span>
                                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => {
                                        navigator.clipboard.writeText(order.orderNumber)
                                        // Could add a toast here
                                    }}>
                                        <span className="font-mono font-bold text-xl text-black">{order.orderNumber}</span>
                                        <Share2 className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-3">Date</span>
                                    <span className="font-bold text-lg text-black">{new Date(order.orderDate).toLocaleDateString()}</span>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-3">Total Amount</span>
                                    <span className="font-bold text-2xl text-green-600">{order.total} <span className="text-sm font-medium uppercase">{order.currency || 'SAR'}</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Items Section */}
                        <div className="p-8 md:p-12">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-black mb-10 flex items-center gap-2">
                                <ShoppingBag className="w-4 h-4" />
                                Your Selection
                            </h3>
                            <div className="space-y-8">
                                {order.items.map((item: any) => (
                                    <div key={item.product || item._id} className="flex gap-6 items-center">
                                        <div className="w-20 h-28 rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100 group hover:border-green-200 transition-colors">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                                    <Package className="h-6 w-6 text-gray-300" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-sm text-black uppercase tracking-wide truncate mb-1">{item.name}</h4>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="font-mono font-bold text-right">
                                            {item.price * item.quantity} <span className="text-[10px] font-medium uppercase text-gray-400">{order.currency || 'SAR'}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Customer Summary Bar */}
                        <div className="bg-blue-50/50 p-8 md:p-10 border-t border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between gap-8">
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Ship To</h3>
                                    <p className="font-bold text-sm text-black">{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                                    <p className="font-medium text-xs text-gray-500 mt-1 uppercase tracking-wide">{order.customerInfo.phone}</p>
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Payment</h3>
                                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-blue-100 w-fit">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <span className="font-bold text-[10px] uppercase tracking-widest text-blue-700">Cash on Delivery</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Share Button - Micro-gamification */}
                    <div className="mt-12 text-center">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Share the happiness!</p>
                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: 'My Kiswa Purchase',
                                        text: 'Check out what I just bought from Kiswa!',
                                        url: window.location.href
                                    })
                                }
                            }}
                            className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center mx-auto hover:bg-gray-50 transition-all active:scale-90"
                        >
                            <Share2 className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
