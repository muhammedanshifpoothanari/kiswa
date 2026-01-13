"use client"

import Link from "next/link"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"

interface CategorySectionProps {
    title: string
    products: any[]
    viewAllLink: string
    backgroundColor?: string
}

export function CategorySection({ title, products, viewAllLink, backgroundColor = "bg-gray-50" }: CategorySectionProps) {
    if (!products || products.length === 0) return null;

    return (
        <section className={`py-12 px-3 md:px-6 ${backgroundColor}`}>
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 px-2">
                    <h2 className="font-heading text-xl md:text-3xl font-bold uppercase tracking-normal text-black leading-none">
                        {title}
                    </h2>
                    <Link href={viewAllLink} className="hidden md:block text-sm font-medium uppercase tracking-wide border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors">
                        View All Products
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 md:gap-x-6">
                    {products.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Button asChild className="w-full bg-black text-white font-heading uppercase text-lg h-12">
                        <Link href={viewAllLink}>View All Products</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
