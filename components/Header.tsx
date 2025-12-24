"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { CartIcon } from "@/components/CartIcon"
import { CartDrawer } from "@/components/CartDrawer"
import Link from "next/link"

export function Header() {
    const [cartOpen, setCartOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
                <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <img
                            src="https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png"
                            alt="KISWA"
                            className="h-16 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Shop
                        </Link>
                        <Link href="/#collection" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Collection
                        </Link>
                        <Link
                            href="/#craftsmanship"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Craftsmanship
                        </Link>
                        <Link href="/#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            About
                        </Link>
                        <Link href="/#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Contact
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <CartIcon onClick={() => setCartOpen(true)} />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </nav>

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
                        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
                            <Link
                                href="/products"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Shop
                            </Link>
                            <Link
                                href="/#collection"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Collection
                            </Link>
                            <Link
                                href="/#craftsmanship"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Craftsmanship
                            </Link>
                            <Link
                                href="/#about"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="/#contact"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    )
}
