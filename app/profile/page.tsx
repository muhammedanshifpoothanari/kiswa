"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBag, MapPin, User, LogOut, Package } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses">("overview")

    const user = {
        name: "Aws Al-Qahtani",
        email: "aws.alqahtani@example.com",
        phone: "+966 55 054 395",
        memberSince: "January 2025"
    }

    const orders = [
        {
            id: "#ORD-9382",
            date: "Jan 9, 2025",
            status: "Processing",
            total: "648.00 SAR",
            items: ["Diamond Velvet Prayer Mat", "Premium Velvet Prayer Mat"]
        },
        {
            id: "#ORD-8271",
            date: "Dec 28, 2024",
            status: "Delivered",
            total: "299.00 SAR",
            items: ["Diamond Velvet Prayer Mat"]
        }
    ]

    const addresses = [
        {
            id: 1,
            type: "Home",
            street: "King Fahd Road",
            district: "Al Olaya",
            city: "Riyadh",
            zip: "12211",
            details: "Near Kingdom Centre"
        }
    ]

    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-3 md:px-6">
            <div className="max-w-[1200px] mx-auto">
                <h1 className="text-3xl font-bold uppercase tracking-normal mb-8 font-heading text-black">My Account</h1>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar Navigation */}
                    <div className="w-full md:w-64 flex-shrink-0 space-y-2">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${activeTab === "overview" ? "bg-black text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
                        >
                            <User className="w-4 h-4" />
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab("orders")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${activeTab === "orders" ? "bg-black text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
                        >
                            <Package className="w-4 h-4" />
                            Orders
                        </button>
                        <button
                            onClick={() => setActiveTab("addresses")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${activeTab === "addresses" ? "bg-black text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
                        >
                            <MapPin className="w-4 h-4" />
                            Addresses
                        </button>
                        <hr className="my-4 border-gray-100" />
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[11px] font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 transition-all">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {activeTab === "overview" && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold uppercase">
                                            {user.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold uppercase tracking-wide">{user.name}</h2>
                                            <p className="text-xs text-gray-500 font-medium">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-white rounded-lg border border-gray-100">
                                            <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">Phone Number</p>
                                            <p className="text-sm font-bold">{user.phone}</p>
                                        </div>
                                        <div className="p-4 bg-white rounded-lg border border-gray-100">
                                            <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">Member Since</p>
                                            <p className="text-sm font-bold">{user.memberSince}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-bold uppercase tracking-wide">Recent Order</h3>
                                        <button onClick={() => setActiveTab("orders")} className="text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:text-black underline decoration-gray-300 underline-offset-4">View All</button>
                                    </div>
                                    {/* Recent Order Card */}
                                    <div className="border border-gray-100 rounded-xl overflow-hidden hover:border-black transition-colors group cursor-pointer">
                                        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b border-gray-100">
                                            <div className="flex gap-4">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Order Placed</p>
                                                    <p className="text-xs font-bold uppercase mt-0.5">{orders[0].date}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Total</p>
                                                    <p className="text-xs font-bold uppercase mt-0.5">{orders[0].total}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Order #</p>
                                                <p className="text-xs font-bold uppercase mt-0.5">{orders[0].id}</p>
                                            </div>
                                        </div>
                                        <div className="p-6 flex items-center justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                    <p className="text-sm font-bold uppercase tracking-wide">{orders[0].status}</p>
                                                </div>
                                                <p className="text-xs text-gray-500 font-medium">{orders[0].items.join(", ")}</p>
                                            </div>
                                            <Button variant="outline" size="sm" className="h-9 px-4 text-[10px] font-bold uppercase tracking-wider rounded-full border-gray-200">
                                                Track Order
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-lg font-bold uppercase tracking-wide mb-6">Order History</h2>
                                {orders.map(order => (
                                    <div key={order.id} className="border border-gray-100 rounded-xl overflow-hidden hover:border-black transition-colors group">
                                        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b border-gray-100">
                                            <div className="flex gap-8">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Order Placed</p>
                                                    <p className="text-xs font-bold uppercase mt-0.5">{order.date}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Total</p>
                                                    <p className="text-xs font-bold uppercase mt-0.5">{order.total}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Order #</p>
                                                <p className="text-xs font-bold uppercase mt-0.5">{order.id}</p>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${order.status === "Delivered" ? "bg-gray-300" : "bg-green-500"}`} />
                                                        <p className="text-sm font-bold uppercase tracking-wide">{order.status}</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500 font-medium">{order.items[0]} {order.items.length > 1 && `+ ${order.items.length - 1} more`}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm" className="h-9 px-4 text-[10px] font-bold uppercase tracking-wider rounded-full border-gray-200">
                                                        View Invoice
                                                    </Button>
                                                    <Button className="h-9 px-6 bg-black text-white hover:bg-gray-800 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                                        Buy Again
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "addresses" && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold uppercase tracking-wide">Saved Addresses</h2>
                                    <Button className="h-9 px-4 bg-black text-white hover:bg-gray-800 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                        Add New
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {addresses.map(addr => (
                                        <div key={addr.id} className="border border-black bg-gray-50 rounded-xl p-6 relative">
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-black text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded">Default</span>
                                            </div>
                                            <div className="flex items-start gap-3 mb-4">
                                                <MapPin className="w-4 h-4 mt-0.5" />
                                                <p className="text-sm font-bold uppercase tracking-wide">{addr.type}</p>
                                            </div>
                                            <div className="space-y-1 text-xs font-bold text-gray-500 uppercase tracking-wide leading-relaxed">
                                                <p className="text-black">{user.name}</p>
                                                <p>{addr.street}</p>
                                                <p>{addr.district}</p>
                                                <p>{addr.city}, {addr.zip}</p>
                                                <p className="text-gray-400 mt-2">{addr.details}</p>
                                            </div>
                                            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200/50">
                                                <button className="text-[10px] font-bold uppercase tracking-wider hover:text-gray-600">Edit</button>
                                                <div className="w-px h-3 bg-gray-300 my-auto" />
                                                <button className="text-[10px] font-bold uppercase tracking-wider text-red-500 hover:text-red-600">Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
