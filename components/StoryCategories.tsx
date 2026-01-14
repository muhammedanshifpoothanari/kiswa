"use client"

import Link from "next/link"
import { useRef } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Category {
    name: string
    slug: string
    image: string
}

interface StoryCategoriesProps {
    categories: Category[]
}

export function StoryCategories({ categories }: StoryCategoriesProps) {
    return (
        <section id="top-collections" className="relative w-full bg-white pt-16 bg-grid">
            <div className="max-w-[1800px] mx-auto">

                {/* Section Header */}
                <div className="px-6 md:px-12 mb-10 md:mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-black mb-3">
                        Top Collections.
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base font-light tracking-wide max-w-md leading-relaxed mx-auto">
                        Redefining Arabic elegance for the modern.
                    </p>
                </div>

                {/* Scrollable Container */}
                <ScrollArea className="w-full whitespace-nowrap pb-8">
                    <div className="flex space-x-6 md:space-x-12 px-6 md:px-12 items-end min-h-[160px] justify-center">
                        {categories.map((category, i) => (
                            <Link
                                key={category.name}
                                href={`/products?category=${category.slug}`}
                                className="flex flex-col items-center gap-4 group shrink-0 relative transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-4"
                                style={{
                                    animation: `fadeInUp 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards`,
                                    animationDelay: `${i * 100}ms`,
                                }}
                            >
                                {/* Circle Container - The "Magnetic Core" */}
                                <div className="p-1.5 rounded-full bg-white border-[3px] border-gray-200 group-hover:border-black/20 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative overflow-hidden">

                                    {/* Shimmer Effect - Visible by default now - Increased Opacity */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                    <div className="p-0.5 rounded-full bg-transparent relative z-10">
                                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden relative bg-gray-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                                            {category.image ? (
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                                    Img
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Text Label with "Breath" */}
                                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-black group-hover:text-black/70 transition-all duration-500 group-hover:tracking-[0.25em]">
                                    {category.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>
            </div>
            <style jsx global>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    )
}
