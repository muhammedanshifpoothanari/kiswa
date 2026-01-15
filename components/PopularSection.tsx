"use client"

import { useState } from "react"
import { ProductCard } from "@/components/ProductCard"
import { DecorativeElements } from "@/components/DecorativeElements"
import { useTranslations } from 'next-intl';

export function PopularSection({ products }: { products: any[] }) {
    const t = useTranslations();
    const [activeCategory, setActiveCategory] = useState<"all" | "prayer-rugs" | "abayas" | "gifts">("all")

    const filteredPopular = products.filter(p => {
        if (activeCategory === "all") return true;
        if (activeCategory === "prayer-rugs") return p.category === "Premium Collection" || p.category === "Luxury Collection" || p.category === "Comfort Collection"
        if (activeCategory === "abayas") return p.category === "Abayas" // Assuming category name
        if (activeCategory === "gifts") return p.category === "Travel Collection"
        return false
    }).slice(0, 4)

    return (
        <section className="relative pt-18 px-4 md:px-12 overflow-hidden bg-white">
            <div className="max-w-[1800px] mx-auto relative z-10">
                <div className="mb-24 flex  md:flex-row md:flex md:items-end justify-between gap-8">
                    <div className="md:flex md:justify-between w-full">
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-black mb-3">
                            {t('Popular.title')}
                        </h2>
                        {/* Categories - Pills Style */}
                        <div className="flex gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                            {[
                                { id: "all", label: "All" },
                                { id: "prayer-rugs", label: t('Popular.categories.prayer_rugs') },
                                { id: "abayas", label: t('Popular.categories.abayas') },
                                { id: "gifts", label: t('Popular.categories.gifts') }
                            ].map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id as any)}
                                    className={`px-6 py-2.5 rounded-full text-[13px] font-medium transition-all whitespace-nowrap border ${activeCategory === cat.id
                                        ? "bg-[#D4AF37] border-[#D4AF37] text-white shadow-md"
                                        : "bg-white border-gray-100 text-gray-600 hover:border-gray-300"
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Grid - Wide Spacing */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-3 md:gap-x-8 md:gap-y-16">
                    {filteredPopular.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
