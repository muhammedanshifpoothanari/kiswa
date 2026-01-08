"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Search, Heart, User, ShoppingBag } from "lucide-react"
import { CartIcon } from "@/components/CartIcon"
import { CartDrawer } from "@/components/CartDrawer"
import Link from "next/link"

export function Header() {
    const [cartOpen, setCartOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-black transition-all duration-300 ${scrolled ? 'h-16' : 'h-20 md:h-32'}`}>
                <nav className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
                    {/* Mobile Menu Icon */}
                    <div className="flex md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-12 w-12 hover:bg-transparent"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>

                    {/* Left Navigation (Desktop) */}
                    <div className="hidden md:flex items-center gap-8">
                        {["Women", "Men", "Accessories", "New Releases"].map((nav) => (
                            <Link
                                key={nav}
                                href="/products"
                                className="text-[13px] font-black uppercase tracking-[0.1em] font-heading hover:text-gray-500 transition-colors"
                            >
                                {nav}
                            </Link>
                        ))}
                    </div>

                    {/* Center Logo - Bold scaling for brand prominence */}
                    <Link
                        href="/"
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    >
                        <img
                            src="https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png"
                            alt="KISWA"
                            className={`w-auto object-contain hover:scale-110 transition-all duration-300 ease-in-out ${scrolled ? 'h-10 md:h-14' : 'h-14 md:h-24'}`}
                        />
                    </Link>

                    {/* Right Icons */}
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="hidden md:flex h-12 w-12 hover:bg-transparent transition-transform hover:scale-110">
                            <Search className="h-6 w-6" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hidden md:flex h-12 w-12 hover:bg-transparent transition-transform hover:scale-110">
                            <Heart className="h-6 w-6" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-transparent transition-transform hover:scale-110">
                            <User className="h-6 w-6" />
                        </Button>
                        <CartIcon onClick={() => setCartOpen(true)} className="h-12 w-12" />
                    </div>
                </nav>

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t-4 border-black bg-white fixed inset-x-0 top-20 bottom-0 z-50 overflow-y-auto">
                        <div className="px-6 py-10 flex flex-col gap-6">
                            {["Women", "Men", "Accessories", "New Releases"].map((nav) => (
                                <Link
                                    key={nav}
                                    href="/products"
                                    className="text-4xl font-black uppercase tracking-tight font-heading hover:bg-black hover:text-white px-2 transition-colors inline-block"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {nav}
                                </Link>
                            ))}
                            <div className="mt-10 pt-10 border-t border-black space-y-4">
                                <Link href="#" className="block text-sm font-bold uppercase tracking-widest font-heading">Help</Link>
                                <Link href="#" className="block text-sm font-bold uppercase tracking-widest font-heading">My Account</Link>
                                <Link href="#" className="block text-sm font-bold uppercase tracking-widest font-heading">Returns</Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <div className={`transition-all duration-300 ${scrolled ? 'h-16' : 'h-20 md:h-32'}`} /> {/* Dynamic spacer for fixed header */}
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    )
}
