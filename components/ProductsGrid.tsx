"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/ProductCard"
import { Search } from "lucide-react"
import { ProductFilter } from "@/components/ProductFilter"

import { getCategories } from "@/app/actions/home"

interface ProductsGridProps {
    products: any[];
    initialCategories?: string[]; // Made optional as we lazy load
}

export function ProductsGrid({ products }: ProductsGridProps) {
    const searchParams = useSearchParams()
    const [categories, setCategories] = useState<string[]>(["All Products"])
    const [selectedCategory, setSelectedCategory] = useState("All Products")
    const [searchQuery, setSearchQuery] = useState("")
    const [loadingCategories, setLoadingCategories] = useState(true)

    useEffect(() => {
        // Fetch categories dynamically
        async function fetchCats() {
            try {
                const dbCategories = await getCategories();
                // Extract names and merge with "All Products"
                const catNames = ["All Products", ...dbCategories.map((c: any) => c.name)];
                setCategories(catNames);
            } catch (error) {
                console.error("Failed to load categories", error);
            } finally {
                setLoadingCategories(false);
            }
        }
        fetchCats();
    }, []);

    useEffect(() => {
        const categoryParam = searchParams.get("category")
        const searchParam = searchParams.get("search")

        if (categoryParam) {
            // Check if category exists in our list (case insensitive)
            // Note: During loading, categories might just be ["All Products"], so we might need to trust the param or wait
            // Use local check or just set it
            setSelectedCategory(categoryParam);
        } else {
            // Default if no param
            setSelectedCategory("All Products");
        }

        if (searchParam) {
            setSearchQuery(searchParam)
        }
    }, [searchParams]) // Removed initialCategories dep

    const filteredProducts = products.filter((product) => {
        let matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory



        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))

        return matchesCategory && matchesSearch
    })

    return (
        <>
            {/* Filters */}
            <section className="py-4 md:py-8 px-3 md:px-6 z-40 bg-white/80 backdrop-blur-md border-b border-black/5">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-8 items-start md:items-center justify-between">
                        {/* Category Filter */}
                        <ProductFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                            isLoading={loadingCategories}
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
        </>
    )
}
