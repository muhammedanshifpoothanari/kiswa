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
        <section className="relative pt-12 pb-6 px-3 md:px-6 overflow-hidden">
            <DecorativeElements />
            <div className="max-w-[1600px] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <h2 className="font-heading text-xl md:text-3xl font-bold uppercase tracking-normal text-black">{t('Popular.title')}</h2>

                    {/* Category Toggle */}
                    <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                        <button
                            onClick={() => setActiveCategory("prayer-rugs")}
                            className={`pb-1 text-sm font-medium transition-all uppercase tracking-wide border-b-2 ${activeCategory === "prayer-rugs"
                                ? "border-black text-black"
                                : "border-transparent text-gray-500 hover:text-black"
                                }`}
                        >
                            {t('Popular.categories.prayer_rugs')}
                        </button>
                        <button
                            onClick={() => setActiveCategory("abayas")}
                            className={`pb-1 text-sm font-medium transition-all uppercase tracking-wide border-b-2 ${activeCategory === "abayas"
                                ? "border-black text-black"
                                : "border-transparent text-gray-500 hover:text-black"
                                }`}
                        >
                            {t('Popular.categories.abayas')}
                        </button>
                        <button
                            onClick={() => setActiveCategory("gifts")}
                            className={`pb-1 text-sm font-medium transition-all uppercase tracking-wide border-b-2 ${activeCategory === "gifts"
                                ? "border-black text-black"
                                : "border-transparent text-gray-500 hover:text-black"
                                }`}
                        >
                            {t('Popular.categories.gifts')}
                        </button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 md:gap-x-6">
                    {filteredPopular.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
