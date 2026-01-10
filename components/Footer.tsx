import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
    return (
        <footer className="bg-[#181818] text-white pt-24 pb-12 px-6">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16 mb-24">
                    {/* Company */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Company</h3>
                        <nav className="flex flex-col gap-4 text-xs font-medium text-gray-400">
                            <Link href="/about" className="hover:text-white transition-colors tracking-wide uppercase">About Us</Link>
                            <Link href="/contact" className="hover:text-white transition-colors tracking-wide uppercase">Contact</Link>
                            <Link href="/products" className="hover:text-white transition-colors tracking-wide uppercase">Shop All</Link>
                        </nav>
                    </div>

                    {/* Support */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Support</h3>
                        <nav className="flex flex-col gap-4 text-xs font-medium text-gray-400">
                            <Link href="/faq" className="hover:text-white transition-colors tracking-wide uppercase">FAQ</Link>
                            <Link href="/shipping" className="hover:text-white transition-colors tracking-wide uppercase">Shipping & Returns</Link>
                            <Link href="/contact" className="hover:text-white transition-colors tracking-wide uppercase">Customer Service</Link>
                        </nav>
                    </div>

                    {/* Legal */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Legal</h3>
                        <nav className="flex flex-col gap-4 text-xs font-medium text-gray-400">
                            <Link href="/privacy" className="hover:text-white transition-colors tracking-wide uppercase">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors tracking-wide uppercase">Terms of Service</Link>
                        </nav>
                    </div>

                    {/* Join the family */}
                    <div className="col-span-2 md:col-span-1 space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Join the family</h3>
                        <p className="text-xs text-gray-400 leading-relaxed max-w-[200px] font-medium">
                            Get 10% off your first order when you sign up to our emails
                        </p>
                        <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold uppercase tracking-wider text-xs h-12 rounded-full">
                            Sign Up Now
                        </Button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <img
                            src="https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png"
                            alt="KISWA"
                            className="h-8 w-auto object-contain brightness-0 invert opacity-80"
                        />
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">© 2026 Kiswa Store. All rights reserved.</p>
                    </div>

                    <div className="flex gap-8">
                        <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>

                <div className="flex gap-6">
                    {[
                        { name: "Instagram", href: "https://www.instagram.com/kiswa.ksa/" },
                        { name: "Twitter", href: "https://x.com/KsaKiswa" },
                        { name: "Facebook", href: "https://www.facebook.com/profile.php?id=100079758515959" }
                    ].map(social => (
                        <Link key={social.name} href={social.href} className="text-gray-500 hover:text-white transition-colors text-[10px] font-medium">
                            {social.name}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}
