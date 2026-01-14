import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100/50 pb-12 pt-10 px-8">
            <div className="max-w-[1800px] mx-auto">
                {/* Top: The Grid - Rational & Ordered */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-10">

                    {/* Brand: The Mark */}
                    <div className="md:col-span-4 flex flex-col justify-between h-full">
                        <div>
                            <img
                                src="https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png"
                                alt="Kiswa"
                                className="h-20 opacity-90 -ml-8"
                            />
                            <p className="text-[13px] text-gray-500 font-medium leading-relaxed max-w-xs tracking-wide">
                                Elevating the spiritual journey through design, craftsmanship, and absolute purity.
                            </p>
                        </div>
                    </div>

                    {/* Navigation: The Index */}
                    <div className="md:col-span-2 space-y-8">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black">Company</h3>
                        <nav className="flex flex-col gap-4 text-[13px] font-medium text-gray-500">
                            <Link href="/about" className="hover:text-black transition-colors">About</Link>
                            <Link href="/careers" className="hover:text-black transition-colors">Careers</Link>
                            <Link href="/sustainability" className="hover:text-black transition-colors">Sustainability</Link>
                            <Link href="/stores" className="hover:text-black transition-colors">Stores</Link>
                        </nav>
                    </div>

                    <div className="md:col-span-2 space-y-8">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black">Support</h3>
                        <nav className="flex flex-col gap-4 text-[13px] font-medium text-gray-500">
                            <Link href="/faq" className="hover:text-black transition-colors">FAQ</Link>
                            <Link href="/shipping" className="hover:text-black transition-colors">Shipping</Link>
                            <Link href="/returns" className="hover:text-black transition-colors">Returns</Link>
                            <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
                        </nav>
                    </div>

                    <div className="md:col-span-4 space-y-8">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black">Newsletter</h3>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-[#F5F5F7] border-0 rounded-xl px-6 py-4 text-[13px] focus:ring-0 focus:bg-gray-100 transition-colors placeholder:text-gray-400 font-medium"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white text-black transition-colors">
                                <span className="text-lg leading-none">→</span>
                            </button>
                        </div>
                        <p className="text-[11px] text-gray-400 font-medium tracking-wide">
                            By subscribing, you agree to our Terms and Privacy Policy.
                        </p>
                    </div>

                </div>

                {/* Bottom: The Detail - Legal & Credit */}
                <div className="flex flex-col md:flex-row justify-between items-center  border-t border-gray-100/50">
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link href="/privacy" className="text-[11px] text-gray-400 font-medium tracking-widest uppercase hover:text-black transition-colors">Privacy</Link>
                        <Link href="/terms" className="text-[11px] text-gray-400 font-medium tracking-widest uppercase hover:text-black transition-colors">Terms</Link>
                        <Link href="/returns" className="text-[11px] text-gray-400 font-medium tracking-widest uppercase hover:text-black transition-colors">Returns</Link>
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium tracking-widest uppercase">
                        © 2026 Kiswa. Designed in Saudi Arabia.
                    </p>

                </div>
            </div>
        </footer>
    )
}
