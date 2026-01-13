"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Search, Heart, User, ShoppingBag } from "lucide-react"
import { CartIcon } from "@/components/CartIcon"
import { CartDrawer } from "@/components/CartDrawer"
import { SearchOverlay } from "@/components/SearchOverlay"
import { WishlistDrawer } from "@/components/WishlistDrawer"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import Link from "next/link"



export function Header() {
    const [cartOpen, setCartOpen] = useState(false)
    const [wishlistOpen, setWishlistOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
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
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm' : 'bg-white'} border-b border-gray-100`}>
                <nav className={`max-w-[1600px] mx-auto px-3 md:px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-18'}`}>
                    {/* Mobile Menu Icon */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="block h-12 w-12 hover:bg-transparent"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>

                    {/* Left Navigation (Desktop) */}
                    <div className="hidden md:flex items-center justify-center gap-8">
                        {[
                            { name: "Prayer Rugs", slug: "Prayer Rugs" },
                            { name: "Abayas", slug: "abayas" },
                            { name: "Gifts", slug: "gifts" }
                        ].map((nav) => (
                            <Link
                                key={nav.name}
                                href={`/products?category=${encodeURIComponent(nav.slug)}`}
                                className="flex items-center justify-center text-lg font-heading uppercase tracking-wide transition-colors hover:text-orange-600"
                            >
                                {nav.name}
                            </Link>
                        ))}
                    </div>

                    {/* Center Logo */}
                    <Link
                        href="/"
                        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                    >
                        {/* Fixed-height container */}
                        <div className="h-10 flex items-center justify-center overflow-visible">
                            <img
                                src="https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png"
                                alt="KISWA"
                                className={`w-auto object-contain transition-transform duration-300 ease-in-out ${scrolled ? "scale-[0.20]" : "scale-[0.25]"
                                    }`}
                            />
                        </div>
                    </Link>


                    {/* Right Icons */}
                    <div className="flex items-center gap-2">
                        <div className="hidden md:block">
                            <LanguageSwitcher />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden md:flex h-10 w-10 hover:bg-gray-100 rounded-full transition-transform hover:scale-105"
                            onClick={() => setSearchOpen(true)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden md:flex h-10 w-10 hover:bg-gray-100 rounded-full transition-transform hover:scale-105"
                            onClick={() => setWishlistOpen(true)}
                        >
                            <Heart className="h-5 w-5" />
                        </Button>
                        <Link href="/profile">
                            <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-gray-100 rounded-full transition-transform hover:scale-105">
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>
                        <CartIcon onClick={() => setCartOpen(true)} className="h-10 w-10" />
                    </div>
                </nav>
            </header>

            {/* Mobile Navigation Menu - Moved outside header for better stacking context */}
            <div className={`fixed inset-0 z-[100] bg-white transition-transform duration-500 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full bg-white">
                    <div className="h-20 border-b flex items-center justify-between px-6">
                        <img
                            src="https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png"
                            alt="KISWA"
                            className="h-8 w-auto"
                        />
                        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                            <X className="h-6 w-6" />
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-8 px-6 space-y-6">
                        {[
                            { name: "Prayer Rugs", slug: "prayer-rugs" },
                            { name: "Abayas", slug: "abayas" },
                            { name: "Gifts", slug: "gifts" },
                            { name: "Collections", slug: "collections" }
                        ].map((nav) => (
                            <Link
                                key={nav.name}
                                href={`/products?category=${encodeURIComponent(nav.slug.toLowerCase())}`}
                                className="block text-xl font-bold uppercase tracking-wide hover:text-gray-400 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {nav.name}
                            </Link>
                        ))}

                        <div className="pt-8 border-t space-y-6">
                            <Link href="/about" className="block text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-black transition-colors" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                            <Link href="/contact" className="block text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-black transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                            <Link href="/faq" className="block text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-black transition-colors" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
                            <Link href="/shipping" className="block text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-black transition-colors" onClick={() => setMobileMenuOpen(false)}>Shipping & Returns</Link>
                        </div>
                    </div>

                    <div className="p-6 border-t bg-gray-50">
                        <div className="mb-4">
                            <LanguageSwitcher />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-900">Customer Support</p>
                            <p className="text-xs text-gray-500 font-medium">Free Standard Shipping on orders over 300 SAR</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`transition-all duration-300 ${scrolled ? 'h-16' : 'h-18'}`} /> {/* Dynamic spacer for fixed header */}
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
            <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
            <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    )
}
