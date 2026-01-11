"use client"

import { BackButton } from "@/components/BackButton"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto">
                    <BackButton className="mb-8" />
                    <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6 text-black">
                        About Kiswa
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
                        Redefining the prayer experience with premium, thoughtfully designed essentials.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6 text-black">
                                Our Story
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Kiswa was born from a simple observation: prayer is one of the most important parts of our daily lives, yet the products we use often don't reflect that significance.
                                </p>
                                <p>
                                    We set out to change that by creating prayer essentials that combine premium quality, thoughtful design, and exceptional comfort. Every product is crafted with the modern Muslim in mind—someone who values both tradition and innovation.
                                </p>
                                <p>
                                    From our signature memory foam prayer mats to our travel-ready accessories, each item is designed to enhance your spiritual practice and bring you closer to what matters most.
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-100 aspect-[4/3] rounded-lg"></div>
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight mb-12 text-black text-center">
                        Our Mission
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-6"></div>
                            <h3 className="font-heading text-lg font-bold uppercase tracking-tight mb-3 text-black">
                                Premium Quality
                            </h3>
                            <p className="text-sm text-gray-600">
                                We use only the finest materials and construction methods to ensure products that last.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-6"></div>
                            <h3 className="font-heading text-lg font-bold uppercase tracking-tight mb-3 text-black">
                                Thoughtful Design
                            </h3>
                            <p className="text-sm text-gray-600">
                                Every detail is considered, from ergonomics to aesthetics, creating products you'll love to use.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-6"></div>
                            <h3 className="font-heading text-lg font-bold uppercase tracking-tight mb-3 text-black">
                                Customer First
                            </h3>
                            <p className="text-sm text-gray-600">
                                Your satisfaction is our priority. We stand behind every product with exceptional service.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight mb-6 text-black">
                        Experience the Difference
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who have elevated their prayer experience with Kiswa.
                    </p>
                    <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 px-12 h-14 rounded-full font-medium text-base">
                        <Link href="/products">Shop Collection</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
