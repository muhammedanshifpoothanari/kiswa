"use client"

import { useEffect, useState } from "react"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package, ShoppingBag, Loader2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getOrderByNumber } from "@/app/actions/order"
    import { OrderSuccessSkeleton } from "@/components/skeletons/OrderSuccessSkeleton"

export default function SuccessPage() {
    const { clearCart } = useCart()
    const searchParams = useSearchParams()
    const orderNumber = searchParams.get("orderNumber")

    const [order, setOrder] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        // Clear cart on success page load if we have an order number (implies successful placement)
        if (orderNumber) {
            clearCart()

            // Fetch order details from server
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
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
                        <ShoppingBag className="h-8 w-8 text-red-500" />
                    </div>
                    <h1 className="text-xl font-bold uppercase tracking-wide mb-2 text-black">Order Not Found</h1>
                    <p className="text-sm text-gray-500 mb-8">{error}</p>
                    <Button asChild className="rounded-full bg-black text-white hover:bg-gray-800">
                        <Link href="/">Return to Store</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Success Message */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-8 animate-scale-in">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6 font-heading text-black">Order Received</h1>
                    <p className="text-lg text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
                        Thank you for your order. We will contact you on WhatsApp at <br className="hidden md:block" />
                        <span className="font-bold text-black border-b border-black">{order.customerInfo.phone}</span> shortly to arrange delivery.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild variant="outline" className="h-12 px-8 rounded-full border-2 border-gray-200 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
                            <Link href="/">
                                Return Home
                            </Link>
                        </Button>
                        <Button
                            className="h-12 px-8 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                            onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000'}?text=Hello, I just placed order ${order.orderNumber}. Can you please confirm?`, '_blank')}
                        >
                            Open WhatsApp
                        </Button>
                    </div>
                </div>
            </section>

            {/* Order Details */}
            <section className="py-16 px-4 md:px-6 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row justify-between mb-10 pb-10 border-b border-gray-100 gap-8">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Order Number</span>
                                <span className="font-mono font-bold text-xl text-black">{order.orderNumber}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Date</span>
                                <span className="font-bold text-lg text-black">{new Date(order.orderDate).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Total Amount</span>
                                <span className="font-bold text-xl text-black">{order.total} SAR</span>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-black">Items Ordered</h3>
                            {order.items.map((item: any) => (
                                <div key={item.product || item._id} className="flex gap-6 items-start">
                                    <div className="w-20 h-24 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                                <Package className="h-6 w-6 text-gray-300" />
                                            </div>
                                        )}

                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-sm text-black uppercase tracking-wide truncate mb-1">{item.name}</h4>
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="font-bold text-sm text-black">
                                        {item.price * item.quantity} SAR
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 pt-10 border-t border-gray-100">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Customer Details</h3>
                                    <p className="font-bold text-sm text-black">{order.customerInfo.firstName}</p>
                                    <p className="font-medium text-sm text-gray-500 mt-1">{order.customerInfo.phone}</p>
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Payment Method</h3>
                                    <p className="font-bold text-sm text-black flex items-center gap-2">
                                        Cash on Delivery (WhatsApp)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
