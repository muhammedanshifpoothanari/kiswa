"use client"

import { useEffect, useState } from "react"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
    const { clearCart } = useCart()
    const [order, setOrder] = useState<any>(null)

    useEffect(() => {
        // Retrieve order details from session storage
        const orderData = sessionStorage.getItem("lastOrder")
        if (orderData) {
            setOrder(JSON.parse(orderData))
            // Clear the temporary storage
            // sessionStorage.removeItem("lastOrder")
        }
    }, [])

    if (!order) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-medium mb-4">Loading order details...</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Success Message */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                    </div>
                    <h1 className="text-4xl font-medium tracking-tight mb-4">Order Received!</h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Thank you for your order. We will contact you on WhatsApp at <br />
                        <span className="font-medium text-foreground">{order?.customerInfo.phone}</span> shortly to arrange delivery and payment.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button asChild variant="outline" className="rounded-full">
                            <Link href="/">
                                Return Home
                            </Link>
                        </Button>
                        <Button className="rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold" onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000'}?text=Hello, I just placed order ${order?.orderNumber}`, '_blank')}>
                            Open WhatsApp
                        </Button>
                    </div>
                </div>
            </section>

            {/* Order Details */}
            <section className="py-12 px-6 bg-secondary/20">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-background rounded-3xl p-8 border border-border shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between mb-8 pb-8 border-b border-border gap-4">
                            <div>
                                <span className="text-muted-foreground block text-sm mb-1">Order Number</span>
                                <span className="font-mono font-medium text-lg">{order?.orderNumber}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block text-sm mb-1">Date</span>
                                <span className="font-medium">{new Date(order?.orderDate).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block text-sm mb-1">Total Amount</span>
                                <span className="font-medium text-lg">{order?.total} SAR</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-medium text-lg">Items Ordered</h3>
                            {order?.items.map((item: any) => (
                                <div key={item.product.id} className="flex gap-4 items-center">
                                    <div className="w-16 h-16 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium">{item.product.name}</h4>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="font-medium">
                                        {item.product.price * item.quantity} SAR
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-border">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-medium mb-2">Customer Details</h3>
                                    <p className="text-muted-foreground">{order?.customerInfo.firstName}</p>
                                    <p className="text-muted-foreground">{order?.customerInfo.phone}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">Payment Method</h3>
                                    <p className="text-muted-foreground">Cash on Delivery (WhatsApp)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
