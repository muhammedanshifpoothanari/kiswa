"use client"

import { useState } from "react"
import { products, categories } from "@/data/products"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ProductFilter } from "@/components/ProductFilter"

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All Products")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="min-h-screen bg-white">
            {/* Page Header */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-[1600px] mx-auto">
                    <h1 className="text-4xl md:text-7xl font-bold uppercase tracking-tight mb-6">
                        All Products
                    </h1>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest max-w-xl">
                        Explore our latest releases and performance essentials. Built for the modern prayer experience.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 px-6 sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-black/5">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                        {/* Category Filter */}
                        <ProductFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />

                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full bg-gray-100 border-none h-12 pl-12 pr-4 text-[13px] font-bold focus:ring-2 focus:ring-black transition-all uppercase placeholder:text-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 px-2 md:px-6">
                <div className="max-w-[1600px] mx-auto">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-32 border-2 border-dashed border-gray-100">
                            <p className="text-xs font-black uppercase tracking-widest text-gray-400">No products found matching your criteria.</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-12">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    {filteredProducts.length} {filteredProducts.length === 1 ? "Result" : "Results"}
                                </p>
                                <div className="flex gap-4">
                                    {/* Sort placeholder for UI */}
                                    <span className="text-[10px] font-black uppercase tracking-widest cursor-not-allowed text-gray-300">Sort By: Featured</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-12">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}
