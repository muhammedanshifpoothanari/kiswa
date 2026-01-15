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
                    <div className="w-full md:w-64 flex-shrink-0 space-y-0 md:space-y-3 flex md:block overflow-x-auto pb-4 md:pb-0 scrollbar-hide gap-3 md:gap-0 -mx-4 px-4 md:mx-0 md:px-0">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`flex-shrink-0 flex items-center gap-3 px-5 py-2.5 md:px-4 md:py-3 rounded-full md:rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap 
                            ${activeTab === "overview"
                                    ? "bg-black text-white shadow-lg shadow-black/10"
                                    : "bg-white text-gray-500 border border-gray-100 hover:border-gray-300 md:border-transparent md:bg-transparent md:hover:bg-gray-50"
                                }`}
                        >
                            <User className="w-4 h-4" />
                            <span className="md:inline">Overview</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("orders")}
                            className={`flex-shrink-0 flex items-center gap-3 px-5 py-2.5 md:px-4 md:py-3 rounded-full md:rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap 
                            ${activeTab === "orders"
                                    ? "bg-black text-white shadow-lg shadow-black/10"
                                    : "bg-white text-gray-500 border border-gray-100 hover:border-gray-300 md:border-transparent md:bg-transparent md:hover:bg-gray-50"
                                }`}
                        >
                            <Package className="w-4 h-4" />
                            Orders
                        </button>
                        <button
                            onClick={() => setActiveTab("addresses")}
                            className={`flex-shrink-0 flex items-center gap-3 px-5 py-2.5 md:px-4 md:py-3 rounded-full md:rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap 
                            ${activeTab === "addresses"
                                    ? "bg-black text-white shadow-lg shadow-black/10"
                                    : "bg-white text-gray-500 border border-gray-100 hover:border-gray-300 md:border-transparent md:bg-transparent md:hover:bg-gray-50"
                                }`}
                        >
                            <MapPin className="w-4 h-4" />
                            Addresses
                        </button>
                        <hr className="hidden md:block my-6 border-gray-100" />
                        <button onClick={handleSignOut} className="hidden md:flex w-full items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 transition-all">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 min-h-[50vh]">
                        {activeTab === "overview" && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100/50">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold uppercase shadow-xl">
                                            {customer?.firstName?.[0] || 'G'}{customer?.lastName?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold uppercase tracking-wide mb-1">
                                                {customer?.firstName || 'Guest'} {customer?.lastName || 'User'}
                                            </h2>
                                            <p className="text-sm text-gray-500 font-medium tracking-wide">{customer?.email || 'No email linked'}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                            <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-2">
                                                {String(contact).includes('@') ? 'Email' : 'Phone Number'}
                                            </p>
                                            <p className="text-sm font-bold tracking-wide">{customer?.phone || contact}</p>
                                        </div>
                                        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                            <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-2">Total Orders</p>
                                            <p className="text-sm font-bold tracking-wide">{orders.length}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-sm font-bold uppercase tracking-widest">Recent Order</h3>
                                        <button onClick={() => setActiveTab("orders")} className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-black hover:underline decoration-gray-300 underline-offset-4 transition-colors">View All</button>
                                    </div>
                                    {/* Recent Order Card */}
                                    {orders.length > 0 ? (
                                        <div className="border border-gray-200 rounded-[2rem] overflow-hidden hover:border-black transition-all duration-300 group cursor-pointer bg-white shadow-sm hover:shadow-lg" onClick={() => setActiveTab("orders")}>
                                            <div className="bg-gray-50/50 px-8 py-5 flex flex-wrap gap-y-3 items-center justify-between border-b border-gray-100">
                                                <div className="flex gap-12">
                                                    <div>
                                                        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Order Placed</p>
                                                        <p className="text-xs font-bold uppercase mt-1 tracking-wide">{new Date(orders[0].orderDate).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Total</p>
                                                        <p className="text-xs font-bold uppercase mt-1 tracking-wide">{orders[0].total} SAR</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Order #</p>
                                                    <p className="text-xs font-bold uppercase mt-1 tracking-wide">{orders[0].orderNumber}</p>
                                                </div>
                                            </div>
                                            <div className="p-8 flex items-center justify-between">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-20 h-20 rounded-[1.25rem] bg-gray-50 overflow-hidden relative border border-gray-100">
                                                        {orders[0].items[0]?.image && (
                                                            <img
                                                                src={orders[0].items[0].image}
                                                                alt="Product"
                                                                className="w-full h-full object-cover mix-blend-multiply"
                                                            />
                                                        )}
                                                        {orders[0].items.length > 1 && (
                                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold">
                                                                +{orders[0].items.length - 1}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2.5 mb-1">
                                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-sm shadow-green-500/50" />
                                                            <p className="text-xs font-bold uppercase tracking-widest">{orders[0].status}</p>
                                                        </div>
                                                        <p className="text-sm font-bold text-black tracking-wide truncate max-w-[200px]">{orders[0].items.map((i: any) => i.name).join(", ")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-16 border border-dashed border-gray-200 rounded-[2rem]">
                                            <p className="text-xs font-bold uppercase text-gray-400 tracking-widest">No orders yet</p>
                                            <Button asChild variant="link" className="text-xs font-bold uppercase mt-4">
                                                <Link href="/products">Start Shopping</Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <div className="space-y-8 animate-fade-in">
                                <h2 className="text-xl font-bold uppercase tracking-tight mb-8">Order History</h2>
                                {orders.length > 0 ? orders.map(order => (
                                    <div key={order.orderNumber} className="border border-gray-200 rounded-[2.5rem] overflow-hidden hover:border-black transition-all duration-300 bg-white shadow-sm hover:shadow-lg">
                                        <div className="bg-gray-50/50 px-8 py-5 flex flex-wrap gap-y-4 items-center justify-between border-b border-gray-100">
                                            <div className="flex gap-12">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Order Placed</p>
                                                    <p className="text-xs font-bold uppercase mt-1 text-black tracking-wide">{new Date(order.orderDate).toLocaleDateString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Total</p>
                                                    <p className="text-xs font-bold uppercase mt-1 text-black tracking-wide">{order.total} SAR</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Order #</p>
                                                <p className="text-xs font-bold uppercase mt-1 text-black tracking-wide">{order.orderNumber}</p>
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <div className="space-y-6">
                                                {order.items.map((item: any) => (
                                                    <div key={item._id} className="flex items-center gap-6">
                                                        <div className="w-20 h-20 rounded-[1.25rem] bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                                                            {item.image && (
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover mix-blend-multiply"
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <h4 className="font-bold text-sm text-black truncate pr-4 uppercase tracking-wide">{item.name}</h4>
                                                                <span className="font-bold text-sm text-black whitespace-nowrap tracking-wide">{item.price} SAR</span>
                                                            </div>
                                                            <p className="text-xs text-gray-500 font-medium tracking-wide">Qty: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                                                <div className="flex items-center gap-2.5">
                                                    <div className={`w-2 h-2 rounded-full ${order.status === "delivered" ? "bg-gray-300" : "bg-green-500 animate-pulse shadow-sm shadow-green-500/50"}`} />
                                                    <p className="text-xs font-bold uppercase tracking-widest">{order.status}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000'}?text=Hello, I need help with order ${order.orderNumber}`, '_blank')} className="h-10 px-6 bg-black text-white hover:bg-black/90 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-black/5 transition-all hover:-translate-y-0.5">
                                                        Support
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-16 border border-dashed border-gray-200 rounded-[2.5rem]">
                                        <p className="text-xs font-bold uppercase text-gray-400 tracking-widest">No orders found</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "addresses" && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-bold uppercase tracking-tight">Saved Addresses</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {customer?.addresses?.map((addr: any, idx: number) => (
                                        <div key={idx} className="border border-gray-200 bg-white shadow-sm rounded-[2rem] p-8 relative group hover:border-black transition-all hover:shadow-lg">
                                            <div className="absolute top-6 right-6">
                                                <span className="bg-gray-100 text-gray-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                                    {addr.type}
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="p-3 bg-gray-50 rounded-full">
                                                    <MapPin className="w-5 h-5 text-black" />
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-xs font-bold text-gray-500 uppercase tracking-wide leading-relaxed">
                                                <p className="text-black text-sm mb-3 tracking-wide">{customer?.firstName} {customer?.lastName}</p>
                                                <p>{addr.street}</p>
                                                <p>{addr.city}, {addr.country}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {(!customer?.addresses || customer.addresses.length === 0) && (
                                        <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-[2.5rem]">
                                            <p className="text-xs font-bold uppercase text-gray-400 tracking-widest">No addresses saved</p>
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
