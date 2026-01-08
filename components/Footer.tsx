import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
    return (
        <footer className="bg-[#181818] text-white pt-24 pb-12 px-6">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16 mb-24">
                    {/* Help */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest font-heading">Help</h3>
                        <nav className="flex flex-col gap-4 text-sm font-medium text-gray-400">
                            {["FAQ", "Delivery Information", "Returns Policy", "Contact Us"].map(item => (
                                <Link key={item} href="#" className="hover:text-white transition-colors uppercase tracking-tight text-[11px] font-bold">{item}</Link>
                            ))}
                        </nav>
                    </div>

                    {/* My Account */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest font-heading">My Account</h3>
                        <nav className="flex flex-col gap-4 text-sm font-medium text-gray-400">
                            {["Login", "Register", "Order History", "Wishlist"].map(item => (
                                <Link key={item} href="#" className="hover:text-white transition-colors uppercase tracking-tight text-[11px] font-bold">{item}</Link>
                            ))}
                        </nav>
                    </div>

                    {/* Pages */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest font-heading">Pages</h3>
                        <nav className="flex flex-col gap-4 text-sm font-medium text-gray-400">
                            {["Shop All", "About Us", "Craftsmanship", "Sustainability"].map(item => (
                                <Link key={item} href="/products" className="hover:text-white transition-colors uppercase tracking-tight text-[11px] font-bold">{item}</Link>
                            ))}
                        </nav>
                    </div>

                    {/* Join the family */}
                    <div className="col-span-2 md:col-span-1 space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest font-heading">Join the family</h3>
                        <p className="text-[11px] font-bold text-gray-400 uppercase leading-relaxed max-w-[200px]">
                            Get 10% off your first order when you sign up to our emails
                        </p>
                        <Button className="w-full bg-white text-black hover:bg-gray-200 font-black uppercase tracking-widest text-[10px] h-12">
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
                            className="h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                        />
                        <p className="text-[10px] font-bold text-gray-500 uppercase">© 2025 Kiswa Store. All rights reserved.</p>
                    </div>

                    <div className="flex gap-8">
                        {["Privacy Policy", "Terms & Conditions", "Cookie Policy"].map(item => (
                            <Link key={item} href="#" className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">{item}</Link>
                        ))}
                    </div>

                    <div className="flex gap-6">
                        {[
                            { name: "Instagram", href: "https://www.instagram.com/kiswa.ksa/" },
                            { name: "Twitter", href: "https://x.com/KsaKiswa" },
                            { name: "Facebook", href: "https://www.facebook.com/profile.php?id=100079758515959" }
                        ].map(social => (
                            <Link key={social.name} href={social.href} className="text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                                {social.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
