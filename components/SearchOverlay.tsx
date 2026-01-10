"use client"

import { useState, useEffect, useRef } from "react"
import { Search as SearchIcon, X, ArrowRight } from "lucide-react"
import { products } from "@/data/products"
import { Product } from "@/types/product"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface SearchOverlayProps {
    open: boolean
    onClose: () => void
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Product[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    const recommendedProducts = products.slice(0, 3)

    useEffect(() => {
        if (open) {
            inputRef.current?.focus()
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
            setQuery("")
            setResults([])
        }
    }, [open])

    useEffect(() => {
        if (query.trim().length > 1) {
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.category.toLowerCase().includes(query.toLowerCase()) ||
                p.description.toLowerCase().includes(query.toLowerCase())
            )
            setResults(filtered.slice(0, 6))
        } else {
            setResults([])
        }
    }, [query])

    if (!open) return null

    return (
        <div className="fixed inset-0 z-[100] bg-white animate-fade-in">
            <div className="max-w-[1600px] mx-auto px-6 pt-8 md:pt-16 h-full flex flex-col">
                <div className="flex items-center justify-between mb-12">
                    <img
                        src="https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png"
                        alt="KISWA"
                        className="h-10 md:h-16 w-auto"
                    />
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-12 w-12 hover:bg-gray-100 transition-all rounded-full">
                        <X className="h-8 w-8" />
                    </Button>
                </div>

                <div className="relative max-w-4xl mx-auto w-full animate-slide-up">
                    <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search products, collections..."
                        className="w-full bg-transparent border-b py-8 pl-14 pr-4 text-2xl md:text-4xl font-bold uppercase tracking-tight outline-none placeholder:text-gray-200 transition-all focus:placeholder:text-gray-300"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") onClose()
                        }}
                    />
                </div>

                <div className="mt-16 flex-1 overflow-y-auto custom-scrollbar pb-20">
                    <div className="max-w-5xl mx-auto">
                        {query.trim().length > 1 ? (
                            <div className="space-y-12">
                                <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-4">Search Results</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                    {results.length > 0 ? (
                                        results.map((product, index) => (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                className="group space-y-4 animate-slide-up"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                                onClick={onClose}
                                            >
                                                <div className="aspect-[3/4] bg-gray-50 overflow-hidden rounded transition-all">
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="font-bold text-xs uppercase tracking-wide">{product.name}</h4>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{product.category}</p>
                                                    <p className="font-bold text-sm tracking-tight">{product.price} {product.currency}</p>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-12 text-center border-4 border-dashed border-gray-100">
                                            <p className="text-xl font-black uppercase tracking-widest text-gray-300">No matching results for "{query}"</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-[1fr_350px] gap-20">
                                <div className="space-y-12 animate-slide-up">
                                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-4">Trending Now</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {["Velvet", "Travel", "Kaaba", "Premium", "Silk", "New Arrivals"].map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => setQuery(s)}
                                                className="px-6 py-2 border rounded-full font-bold text-[10px] uppercase tracking-wide hover:bg-black hover:text-white transition-all shadow-sm"
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="pt-8 space-y-4">
                                        <p className="text-[11px] font-medium text-gray-400">Need help?</p>
                                        <div className="flex gap-8">
                                            <Link href="/products" className="text-xs font-bold uppercase tracking-wide underline underline-offset-4 hover:text-gray-500 transition-colors">View All Collections</Link>
                                            <Link href="/contact" className="text-xs font-bold uppercase tracking-wide underline underline-offset-4 hover:text-gray-500 transition-colors">Contact Expert</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-12 animate-slide-up" style={{ animationDelay: '150ms' }}>
                                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-4">Our Picks</h3>
                                    <div className="space-y-8">
                                        {recommendedProducts.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                className="group flex gap-6 items-center"
                                                onClick={onClose}
                                            >
                                                <div className="w-20 h-24 bg-gray-50 overflow-hidden rounded flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="font-bold text-[11px] uppercase tracking-wide leading-tight group-hover:text-gray-600">{product.name}</h4>
                                                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{product.category}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {results.length > 0 && (
                    <div className="py-8 bg-white border-t text-center animate-fade-in">
                        <Link
                            href={`/products?search=${query}`}
                            onClick={onClose}
                            className="inline-flex items-center gap-4 group"
                        >
                            <span className="font-bold text-xs uppercase tracking-wide">View all {results.length} results</span>
                            <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded group-hover:translate-x-1 transition-transform">
                                <ArrowRight className="h-4 w-4" />
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
