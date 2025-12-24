import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t border-border bg-secondary/5 pt-16 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand & Social */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-bold tracking-tight">KISWA</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Premium Islamic lifestyle products, crafted with care and tradition for the modern home.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="https://www.instagram.com/kiswa.ksa/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                            </a>
                            <a href="https://x.com/KsaKiswa" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=100079758515959" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6 lg:col-span-2">
                        <div>
                            <h3 className="font-medium text-lg mb-4">Get in Touch</h3>

                            {/* KSA Store Section */}
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold mb-3 text-foreground">Kiswa Store (KSA)</h4>
                                <div className="grid sm:grid-cols-2 gap-8">
                                    <div className="space-y-3 text-sm text-muted-foreground">
                                        <div className="flex gap-2 items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 flex-shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                            <span>Bin Affan, Ash Sharafiyah,<br />Jeddah 23216</span>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                            <span>055 393 5956</span>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                            <a href="mailto:sales@kiswastore.com" className="hover:text-foreground transition-colors">sales@kiswastore.com</a>
                                        </div>
                                        <div className="flex gap-2 items-center pt-2">
                                            <a href="https://wa.me/966553935956" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                                                Chat on WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <div className="grid grid-cols-[100px_1fr] gap-2">
                                            <span className="font-medium text-foreground">Wed - Thu</span>
                                            <span>10AM–2PM, 5PM–7PM</span>
                                        </div>
                                        <div className="grid grid-cols-[100px_1fr] gap-2">
                                            <span className="font-medium text-foreground">Friday</span>
                                            <span className="text-primary">Closed</span>
                                        </div>
                                        <div className="grid grid-cols-[100px_1fr] gap-2">
                                            <span className="font-medium text-foreground">Sat - Tue</span>
                                            <span>10AM–2PM, 5PM–7PM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-lg">Links</h3>
                        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <Link href="/products" className="hover:text-foreground transition-colors">Shop All</Link>
                            <Link href="#" className="hover:text-foreground transition-colors">About Us</Link>
                            <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
                        </nav>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">© 2025 Kiswa. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
