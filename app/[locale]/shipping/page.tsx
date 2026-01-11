"use client"

import { BackButton } from "@/components/BackButton"
import { Package, Truck, RefreshCw, Clock } from "lucide-react"

export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto">
                    <BackButton className="mb-8" />
                    <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6 text-black">
                        Shipping & Returns
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
                        Fast, reliable shipping and hassle-free returns.
                    </p>
                </div>
            </section>

            {/* Shipping Info */}
            <section className="py-16 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="font-heading text-3xl font-bold uppercase tracking-tight mb-12 text-black">
                        Shipping Information
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Truck className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="font-bold text-sm uppercase tracking-wide mb-2">Free Shipping</h3>
                            <p className="text-sm text-gray-600">On orders over 300 SAR</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Clock className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="font-bold text-sm uppercase tracking-wide mb-2">2-4 Days</h3>
                            <p className="text-sm text-gray-600">Standard delivery</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Package className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="font-bold text-sm uppercase tracking-wide mb-2">Tracking</h3>
                            <p className="text-sm text-gray-600">On all orders</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                                <RefreshCw className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="font-bold text-sm uppercase tracking-wide mb-2">30-Day Returns</h3>
                            <p className="text-sm text-gray-600">Easy returns</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                Domestic Shipping (Saudi Arabia)
                            </h3>
                            <div className="space-y-4 text-gray-600">
                                <p><strong>Standard Shipping:</strong> 2-4 business days (Free on orders over 300 SAR, otherwise 25 SAR)</p>
                                <p><strong>Express Shipping:</strong> Next business day in major cities (50 SAR)</p>
                                <p>Orders placed before 2 PM are processed the same day.</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                International Shipping (GCC)
                            </h3>
                            <div className="space-y-4 text-gray-600">
                                <p><strong>Standard International:</strong> 5-7 business days (75 SAR)</p>
                                <p>Available to UAE, Kuwait, Bahrain, Qatar, and Oman.</p>
                                <p>Customs duties and taxes are the responsibility of the recipient.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Returns Policy */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="font-heading text-3xl font-bold uppercase tracking-tight mb-12 text-black">
                        Returns & Exchanges
                    </h2>

                    <div className="space-y-8">
                        <div>
                            <h3 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                30-Day Return Policy
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We want you to be completely satisfied with your purchase. If you're not happy with your order, you can return it within 30 days of delivery for a full refund.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Items must be unused, in original packaging, and in the same condition as received.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                How to Return
                            </h3>
                            <ol className="list-decimal pl-6 space-y-2 text-gray-600">
                                <li>Contact us at sales@kiswastore.com with your order number</li>
                                <li>We'll send you a return authorization and shipping label</li>
                                <li>Pack the item securely in its original packaging</li>
                                <li>Ship the item back using the provided label</li>
                                <li>Refund will be processed within 5-7 business days of receiving the return</li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                Exchanges
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                If you need a different size or color, contact us and we'll arrange an exchange. We'll cover the shipping costs for exchanges on defective items.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                Damaged or Defective Items
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                If you receive a damaged or defective item, contact us immediately. We'll arrange for a replacement or full refund, including return shipping costs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 px-6">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h2 className="font-heading text-2xl font-bold uppercase tracking-tight mb-4 text-black">
                        Questions About Shipping or Returns?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Our customer service team is here to help.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </div>
    )
}
