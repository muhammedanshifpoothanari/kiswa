"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBag, MapPin, User, LogOut, Package, Loader2, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PhoneVerificationModal } from "@/components/PhoneVerificationModal"
import { getCustomer, getCustomerOrders } from "@/app/actions/customer"

import { ProfileSkeleton } from "@/components/skeletons/ProfileSkeleton"

export default function ProfilePage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses">("overview")
    const [isVerified, setIsVerified] = useState(false)
    const [contact, setContact] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false)

    // Data State
    const [customer, setCustomer] = useState<any>(null)
    const [orders, setOrders] = useState<any[]>([])

    // Check verification status on load
    useEffect(() => {
        const checkVerification = () => {
            const stored = localStorage.getItem('kiswa_verified_user')
            if (stored) {
                try {
                    const data = JSON.parse(stored)
                    // Check if valid AND has contact info
                    const storedContact = data.contact || data.phone
                    if (new Date(data.expiresAt) > new Date() && storedContact) {
                        setIsVerified(true)
                        setContact(storedContact)
                        // Do NOT set loading to false here, wait for data fetch
                    } else {
                        // Expired or invalid data
                        localStorage.removeItem('kiswa_verified_user')
                        setIsVerified(false)
                        setLoading(false)
                    }
                } catch (e) {
                    console.error("Error parsing auth data", e)
                    localStorage.removeItem('kiswa_verified_user')
                    setIsVerified(false)
                    setLoading(false)
                }
            } else {
                setIsVerified(false)
                setLoading(false)
            }
        }
        checkVerification()
    }, [])

    // Fetch Data
    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            if (!contact) return

            try {
                setLoading(true)
                console.log("Fetching customer data for", contact)
                const custData = await getCustomer(contact)

                if (!isMounted) return

                if (custData) {
                    console.log("Customer found:", custData._id)
                    setCustomer(custData)
                    // Once we have customer, fetch orders using their ID
                    const ordersData = await getCustomerOrders(custData._id)
                    if (isMounted) setOrders(ordersData)
                } else {
                    console.warn("Customer not found in DB")
                    // If phone exists in storage but not DB, maybe clear storage?
                    // localStorage.removeItem('kiswa_verified_user')
                    // setIsVerified(false)
                }
            } catch (error) {
                console.error("Profile fetch error:", error)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchData()

        return () => {
            isMounted = false
        }
    }, [contact])

    const handleSignOut = () => {
        localStorage.removeItem('kiswa_verified_user')
        setIsVerified(false)
        setCustomer(null)
        router.push('/')
    }


    // ... imports

    if (loading) {
        return <ProfileSkeleton />
    }

    if (!isVerified) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                    <User className="h-8 w-8 text-gray-400" />
                </div>
                <h1 className="text-xl font-bold uppercase tracking-wide mb-2">Sign In Required</h1>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">Please verify your identity to access your profile and order history.</p>
                <Button onClick={() => setIsVerificationModalOpen(true)} className="rounded-full px-8 bg-black text-white hover:bg-gray-800">
                    Sign In / Verify
                </Button>

                <PhoneVerificationModal
                    isOpen={isVerificationModalOpen}
                    onClose={() => setIsVerificationModalOpen(false)}
                    onVerified={(contactInfo) => { // Accept the argument
                        const stored = localStorage.getItem('kiswa_verified_user')
                        if (stored) {
                            const data = JSON.parse(stored)
                            // contact should be in data.contact ideally, but fallbacks ok
                            setContact(data.contact || data.phone || contactInfo)
                            setIsVerified(true)
                            setIsVerificationModalOpen(false)
                        }
                    }}
                />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-6">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold uppercase tracking-normal font-heading text-black">My Account</h1>
                    <Button variant="ghost" className="md:hidden text-red-500 hover:text-red-600 hover:bg-red-50 p-2" onClick={handleSignOut}>
                        <LogOut className="w-5 h-5" />
                    </Button>
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    {/* Sidebar Navigation */}
                    <div className="w-full md:w-64 flex-shrink-0 space-y-1 md:space-y-2 flex md:block overflow-x-auto pb-2 md:pb-0 scrollbar-hide gap-2">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`flex-shrink-0 w-auto md:w-full flex items-center gap-3 px-4 py-3 rounded-full md:rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === "overview" ? "bg-black text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                        >
                            <User className="w-4 h-4" />
                            <span className="md:inline">Overview</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("orders")}
                            className={`flex-shrink-0 w-auto md:w-full flex items-center gap-3 px-4 py-3 rounded-full md:rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === "orders" ? "bg-black text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                        >
                            <Package className="w-4 h-4" />
                            Orders
                        </button>
                        <button
                            onClick={() => setActiveTab("addresses")}
                            className={`flex-shrink-0 w-auto md:w-full flex items-center gap-3 px-4 py-3 rounded-full md:rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === "addresses" ? "bg-black text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                        >
                            <MapPin className="w-4 h-4" />
                            Addresses
                        </button>
                        <hr className="hidden md:block my-4 border-gray-100" />
                        <button onClick={handleSignOut} className="hidden md:flex w-full items-center gap-3 px-4 py-3 rounded-lg text-[11px] font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 transition-all">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 min-h-[50vh]">
                        {activeTab === "overview" && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-xl font-bold uppercase">
                                            {customer?.firstName?.[0] || 'G'}{customer?.lastName?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold uppercase tracking-wide">
                                                {customer?.firstName || 'Guest'} {customer?.lastName || 'User'}
                                            </h2>
                                            <p className="text-xs text-gray-500 font-medium">{customer?.email || 'No email linked'}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                            <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">
                                                {String(contact).includes('@') ? 'Email' : 'Phone Number'}
                                            </p>
                                            <p className="text-sm font-bold">{customer?.phone || contact}</p>
                                        </div>
                                        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                            <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">Total Orders</p>
                                            <p className="text-sm font-bold">{orders.length}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-bold uppercase tracking-wide">Recent Order</h3>
                                        <button onClick={() => setActiveTab("orders")} className="text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:text-black hover:underline decoration-gray-300 underline-offset-4">View All</button>
                                    </div>
                                    {/* Recent Order Card */}
                                    {orders.length > 0 ? (
                                        <div className="border border-gray-200 rounded-2xl overflow-hidden hover:border-black transition-all duration-300 group cursor-pointer bg-white shadow-sm hover:shadow-md" onClick={() => setActiveTab("orders")}>
                                            <div className="bg-gray-50 px-6 py-4 flex flex-wrap gap-y-2 items-center justify-between border-b border-gray-100">
                                                <div className="flex gap-8">
                                                    <div>
                                                        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Order Placed</p>
                                                        <p className="text-xs font-bold uppercase mt-0.5">{new Date(orders[0].orderDate).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Total</p>
                                                        <p className="text-xs font-bold uppercase mt-0.5">{orders[0].total} SAR</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Order #</p>
                                                    <p className="text-xs font-bold uppercase mt-0.5">{orders[0].orderNumber}</p>
                                                </div>
                                            </div>
                                            <div className="p-6 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-md bg-gray-100 border border-gray-200 overflow-hidden relative">
                                                        {orders[0].items[0]?.image && (
                                                            <img
                                                                src={orders[0].items[0].image}
                                                                alt="Product"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        )}
                                                        {orders[0].items.length > 1 && (
                                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold">
                                                                +{orders[0].items.length - 1}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                            <p className="text-sm font-bold uppercase tracking-wide">{orders[0].status}</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500 font-medium truncate max-w-[200px]">{orders[0].items.map((i: any) => i.name).join(", ")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl">
                                            <p className="text-xs font-bold uppercase text-gray-400">No orders yet</p>
                                            <Button asChild variant="link" className="text-xs font-bold uppercase mt-2">
                                                <Link href="/products">Start Shopping</Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-lg font-bold uppercase tracking-wide mb-6">Order History</h2>
                                {orders.length > 0 ? orders.map(order => (
                                    <div key={order.orderNumber} className="border border-gray-200 rounded-2xl overflow-hidden hover:border-black transition-all duration-300 bg-white shadow-sm">
                                        <div className="bg-gray-50 px-6 py-4 flex flex-wrap gap-y-4 items-center justify-between border-b border-gray-100">
                                            <div className="flex gap-8">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Order Placed</p>
                                                    <p className="text-xs font-bold uppercase mt-0.5 text-black">{new Date(order.orderDate).toLocaleDateString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Total</p>
                                                    <p className="text-xs font-bold uppercase mt-0.5 text-black">{order.total} SAR</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Order #</p>
                                                <p className="text-xs font-bold uppercase mt-0.5 text-black">{order.orderNumber}</p>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-4">
                                                {order.items.map((item: any) => (
                                                    <div key={item._id} className="flex items-center gap-4">
                                                        <div className="w-16 h-16 rounded-md bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
                                                            {item.image && (
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-start mb-1">
                                                                <h4 className="font-bold text-sm text-black truncate pr-4">{item.name}</h4>
                                                                <span className="font-bold text-sm text-black whitespace-nowrap">{item.price} SAR</span>
                                                            </div>
                                                            <p className="text-xs text-gray-500 font-medium">Qty: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${order.status === "delivered" ? "bg-gray-300" : "bg-green-500"}`} />
                                                    <p className="text-xs font-bold uppercase tracking-wide">{order.status}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    {/* <Button variant="outline" size="sm" className="h-9 px-4 text-[10px] font-bold uppercase tracking-wider rounded-full border-gray-200">
                                                        View Invoice
                                                    </Button> */}
                                                    <Button onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000'}?text=Hello, I need help with order ${order.orderNumber}`, '_blank')} className="h-9 px-6 bg-black text-white hover:bg-gray-800 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                                        Support
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl">
                                        <p className="text-xs font-bold uppercase text-gray-400">No orders found</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "addresses" && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold uppercase tracking-wide">Saved Addresses</h2>
                                    {/* <Button className="h-9 px-4 bg-black text-white hover:bg-gray-800 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                        Add New
                                    </Button> */}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {customer?.addresses?.map((addr: any, idx: number) => (
                                        <div key={idx} className="border border-gray-200 bg-white shadow-sm rounded-xl p-6 relative group hover:border-black transition-colors">
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded">
                                                    {addr.type}
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-3 mb-4">
                                                <div className="p-2 bg-gray-50 rounded-full">
                                                    <MapPin className="w-4 h-4 text-black" />
                                                </div>
                                            </div>
                                            <div className="space-y-1 text-xs font-bold text-gray-500 uppercase tracking-wide leading-relaxed">
                                                <p className="text-black text-sm mb-2">{customer?.firstName} {customer?.lastName}</p>
                                                <p>{addr.street}</p>
                                                <p>{addr.city}, {addr.country}</p>
                                            </div>
                                            {/* <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                                                <button className="text-[10px] font-bold uppercase tracking-wider hover:text-gray-600">Edit</button>
                                                <div className="w-px h-3 bg-gray-300 my-auto" />
                                                <button className="text-[10px] font-bold uppercase tracking-wider text-red-500 hover:text-red-600">Remove</button>
                                            </div> */}
                                        </div>
                                    ))}
                                    {(!customer?.addresses || customer.addresses.length === 0) && (
                                        <div className="col-span-full text-center py-12 border border-dashed border-gray-200 rounded-xl">
                                            <p className="text-xs font-bold uppercase text-gray-400">No addresses saved</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
