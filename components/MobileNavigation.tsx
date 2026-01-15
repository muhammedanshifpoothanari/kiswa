"use client"

import Link from "next/link"
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MobileNavigation() {
    const pathname = usePathname()

    const navItems = [
        { href: "/", icon: Home, label: "Home" },
        { href: "/products", icon: Search, label: "Search" },
        { href: "/wishlist", icon: Heart, label: "Wishlist" },
        { href: "/cart", icon: ShoppingBag, label: "Cart" },
        { href: "/profile", icon: User, label: "Profile" },
    ]

    // Hide bottom nav on: home, checkout, and individual product detail pages
    const isProductDetailPage = pathname?.match(/^\/[^\/]+\/products\/[^\/]+$/) // matches /locale/products/id
    const hideBottomNav = pathname === "/" || pathname?.includes("/checkout") || isProductDetailPage

    return (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto md:hidden ${hideBottomNav ? "hidden" : ""}`}>
            <nav className="bg-[#111111] text-white/40 backdrop-blur-xl rounded-full px-8 py-4 shadow-2xl flex items-center justify-between gap-10 border border-white/5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-center transition-all duration-300",
                                isActive ? "text-white" : "hover:text-white"
                            )}
                        >
                            <div className={cn(
                                "flex items-center justify-center rounded-full transition-all duration-300",
                                isActive ? "w-10 h-10 bg-[#C5A265] text-white" : "w-6 h-6"
                            )}>
                                <item.icon
                                    strokeWidth={isActive ? 2 : 1.5}
                                    className={cn("w-5 h-5", isActive ? "fill-white/20" : "")}
                                />
                            </div>
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
