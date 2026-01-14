"use client"

import { useState } from "react"
import { ProductCard } from "@/components/ProductCard"
import { DecorativeElements } from "@/components/DecorativeElements"
import { useTranslations } from 'next-intl';

export function PopularSection({ products }: { products: any[] }) {
    const t = useTranslations();
    const [activeCategory, setActiveCategory] = useState<"prayer-rugs" | "abayas" | "gifts">("prayer-rugs")

    const filteredPopular = products.filter(p => {
        if (activeCategory === "prayer-rugs") return p.category === "Premium Collection" || p.category === "Luxury Collection" || p.category === "Comfort Collection"
        if (activeCategory === "gifts") return p.category === "Travel Collection"
        return false
    }).slice(0, 4)

    return (
        <section className="relative pt-18 px-6 md:px-12 overflow-hidden bg-white">
            <div className="max-w-[1800px] mx-auto relative z-10">
                <div className="mb-24 flex  md:flex-row md:flex md:items-end justify-between gap-8">
                    <div className="md:flex md:justify-between w-full">
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-black mb-3">
                            {t('Popular.title')}
                        </h2>
                        {/* Categories - Minimal Text Links */}
                        <div className="flex gap-6">
                            <button
                                onClick={() => setActiveCategory("prayer-rugs")}
                                className={`text-sm font-medium transition-all uppercase tracking-widest border-b ${activeCategory === "prayer-rugs"
                                    ? "border-black text-black"
                                    : "border-transparent text-gray-400 hover:text-black"
                                    }`}
                            >
                                {t('Popular.categories.prayer_rugs')}
                            </button>
                            <button
                                onClick={() => setActiveCategory("abayas")}
                                className={`text-sm font-medium transition-all uppercase tracking-widest border-b ${activeCategory === "abayas"
                                    ? "border-black text-black"
                                    : "border-transparent text-gray-400 hover:text-black"
                                    }`}
                            >
                                {t('Popular.categories.abayas')}
                            </button>
                            <button
                                onClick={() => setActiveCategory("gifts")}
                                className={`text-sm font-medium transition-all uppercase tracking-widest border-b ${activeCategory === "gifts"
                                    ? "border-black text-black"
                                    : "border-transparent text-gray-400 hover:text-black"
                                    }`}
                            >
                                {t('Popular.categories.gifts')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Grid - Wide Spacing */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
                    {filteredPopular.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
