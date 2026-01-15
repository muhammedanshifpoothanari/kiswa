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
import { usePathname } from "next/navigation"



export function Header() {
    const [cartOpen, setCartOpen] = useState(false)
    const [wishlistOpen, setWishlistOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    const pathname = usePathname()
    // Show header on these pages even on mobile
    const showHeader = pathname?.includes('/products') ||
        pathname?.includes('/profile') ||
        pathname?.includes('/wishlist') ||
        pathname?.includes('/cart') ||
        pathname?.includes('/checkout')

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <header
                className={`${showHeader ? 'fixed' : 'hidden'} md:block md:fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] 
                ${scrolled ? 'bg-white/80 backdrop-blur-2xl py-4 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]' : 'bg-transparent py-8'}`}
            >
                <nav className="max-w-[1800px] mx-auto px-8 flex items-center justify-between">

                    {/* Left: The Navigation - Pure Text */}
                    <div className="hidden md:flex items-center gap-12">
                        {[
                            { name: "Prayer Rugs", slug: "Prayer Rugs" },
                            { name: "Abayas", slug: "abayas" },
                            { name: "Gifts", slug: "gifts" }
                        ].map((nav) => (
                            <Link
                                key={nav.name}
                                href={`/products?category=${encodeURIComponent(nav.slug)}`}
                                className={`text-[13px] font-medium tracking-[0.02em] transition-opacity duration-300 hover:opacity-50 ${scrolled ? 'text-black' : 'text-black'}`}
                            >
                                {nav.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Icon - Reductive */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 hover:bg-black/5 rounded-full"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className="h-[18px] w-[18px] stroke-[1.5]" />
                        </Button>
                    </div>

                    {/* Center: The Mark - Absolute Anchor */}
                    <Link
                        href="/"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group"
                    >
                        <img
                            src="https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png"
                            alt="KISWA"
                            className={`transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${scrolled ? "h-18 opacity-90" : "h-24 opacity-100"}`}
                        />
                    </Link>

                    {/* Right: The Tools - Fine Lines */}
                    <div className="flex items-center gap-2">
                        <div className="hidden md:block">
                            <LanguageSwitcher />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden md:flex h-10 w-10 hover:bg-black/5 rounded-full transition-colors"
                            onClick={() => setSearchOpen(true)}
                        >
                            <Search className="h-[18px] w-[18px] stroke-[1.5]" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden md:flex h-10 w-10 hover:bg-black/5 rounded-full transition-colors"
                            onClick={() => setWishlistOpen(true)}
                        >
                            <Heart className="h-[18px] w-[18px] stroke-[1.5]" />
                        </Button>
                        <Link href="/profile">
                            <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-black/5 rounded-full transition-colors">
                                <User className="h-[18px] w-[18px] stroke-[1.5]" />
                            </Button>
                        </Link>
                        <CartIcon onClick={() => setCartOpen(true)} className="h-10 w-10 stroke-[1.5]" />
                    </div>
                </nav>
            </header>

            {/* Mobile Navigation Menu - Material Sheet */}
            <div className={`fixed inset-0 z-[100] bg-white/95 backdrop-blur-3xl transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full relative p-8">
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="absolute top-8 right-8 z-10 rounded-full hover:bg-black/5">
                        <X className="h-6 w-6 stroke-[1.5]" />
                    </Button>

                    <div className="flex-1 flex flex-col justify-center space-y-10">
                        {[
                            { name: "Prayer Rugs", slug: "prayer-rugs" },
                            { name: "Abayas", slug: "abayas" },
                            { name: "Gifts", slug: "gifts" },
                            { name: "Collections", slug: "collections" }
                        ].map((nav, i) => (
                            <Link
                                key={nav.name}
                                href={`/products?category=${encodeURIComponent(nav.slug.toLowerCase())}`}
                                className="text-4xl font-light tracking-tight text-black flex items-center gap-4 group"
                                onClick={() => setMobileMenuOpen(false)}
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                <span className="w-0 group-hover:w-4 h-[1px] bg-black transition-all duration-300"></span>
                                {nav.name}
                            </Link>
                        ))}
                    </div>

                    <div className="border-t border-black/5 pt-10">
                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <Link href="/about" className="text-sm text-gray-400 hover:text-black transition-colors" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                            <Link href="/contact" className="text-sm text-gray-400 hover:text-black transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                            <Link href="/faq" className="text-sm text-gray-400 hover:text-black transition-colors" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
                        </div>
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
            <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
            <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    )
}
