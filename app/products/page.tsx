"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { products, categories } from "@/data/products"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { ProductFilter } from "@/components/ProductFilter"
import { BackButton } from "@/components/BackButton"

function ProductsContent() {
    const searchParams = useSearchParams()
    const [selectedCategory, setSelectedCategory] = useState("All Products")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const categoryParam = searchParams.get("category")
        const searchParam = searchParams.get("search")

        if (categoryParam) {
            // Handle both slug and display name matching if possible, or just exact match
            const validCategory = categories.find(c =>
                c === categoryParam ||
                c.toLowerCase().includes(categoryParam.toLowerCase())
            )
            if (validCategory) setSelectedCategory(validCategory)
            else if (categoryParam === "prayer-rugs") {
                // Map Prayer Rugs to multiple collections
                setSelectedCategory("Prayer Rugs")
            } else if (categoryParam === "gifts") {
                setSelectedCategory("Travel Collection")
            } else if (categoryParam === "abayas") {
                setSelectedCategory("Abayas")
            }
        }

        if (searchParam) {
            setSearchQuery(searchParam)
        }
    }, [searchParams])

    const filteredProducts = products.filter((product) => {
        let matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory

        // Custom logic for meta-categories
        if (selectedCategory === "Prayer Rugs") {
            matchesCategory = product.category === "Premium Collection" ||
                product.category === "Luxury Collection" ||
                product.category === "Comfort Collection"
        } else if (selectedCategory === "Abayas") {
            matchesCategory = false // No products yet
        }

        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="min-h-screen bg-white">
            {/* Page Header */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-[1600px] mx-auto">
                    <h1 className="text-xl md:text-3xl font-bold uppercase tracking-normal mb-6 font-heading text-black">
                        All Products
                    </h1>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide max-w-xl">
                        Explore our latest releases and performance essentials. Built for the modern prayer experience.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="py-4 md:py-8 px-3 md:px-6 z-40 bg-white/80 backdrop-blur-md border-b border-black/5">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-8 items-start md:items-center justify-between">
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
                                className="w-full bg-gray-100 border-none h-12 pl-12 pr-4 text-[13px] font-bold focus:ring-2 focus:ring-black transition-all uppercase placeholder:text-gray-400 tracking-wide rounded-md"
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
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                    {filteredProducts.length} {filteredProducts.length === 1 ? "Result" : "Results"}
                                </p>
                                <div className="flex gap-4">
                                    {/* Sort placeholder for UI */}
                                    <span className="text-[10px] font-bold uppercase tracking-wider cursor-not-allowed text-gray-300">Sort By: Featured</span>
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

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-xs font-bold uppercase tracking-widest">Loading...</p></div>}>
            <ProductsContent />
        </Suspense>
    )
}
