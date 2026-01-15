"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/ProductCard"
import { Search, SlidersHorizontal } from "lucide-react"
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
            {/* Filters - Dissolving into the background */}
            <section className="relative bg-white border-b border-gray-100/50 transition-all duration-500">
                <div className="max-w-[1800px] mx-auto px-6 md:px-8 py-4">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                        {/* Category Filter - Responsive: Pills on Mobile, Text on Desktop */}
                        <div className="flex flex-wrap gap-3 md:gap-8 pb-2 md:pb-0">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`
                                        whitespace-nowrap transition-all duration-300
                                        text-sm font-medium
                                        
                                        /* Mobile: Pill Style */
                                        px-5 py-2.5 rounded-full border
                                        ${selectedCategory === cat
                                            ? "bg-black text-white border-black shadow-md"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                        }

                                        /* Desktop: Pure Text Style (Resetting Mobile) */
                                        md:px-0 md:py-0 md:rounded-none md:border-0 md:shadow-none md:bg-transparent
                                        md:text-[13px] md:tracking-[0.02em]
                                        ${selectedCategory === cat
                                            ? "md:text-black md:opacity-100"
                                            : "md:text-gray-400 md:hover:text-black md:hover:opacity-100"
                                        }
                                    `}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search - Responsive: Home Style on Mobile, Minimal on Desktop */}
                        <div className="w-full md:w-64">
                            {/* Mobile: Home Page Style */}
                            <div className="relative md:hidden">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 stroke-[1.5]" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full h-12 rounded-full pl-12 pr-12 bg-white border border-gray-200 text-sm focus:outline-none focus:border-black/20 transition-colors"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <SlidersHorizontal className="w-5 h-5 text-gray-400 stroke-[1.5]" />
                                </button>
                            </div>

                            {/* Desktop: Minimal Invisible Input */}
                            <div className="hidden md:block relative w-full group">
                                <Search className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-black transition-colors duration-300" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full bg-transparent border-0 border-b border-transparent group-hover:border-gray-200 focus:border-black h-8 px-0 text-[13px] focus:ring-0 transition-all placeholder:text-gray-300 text-right pr-6"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid - The Archive */}
            <section className="px-2 md:px-8 pb-32 pt-8">
                <div className="max-w-[1800px] mx-auto">
                    {filteredProducts.length === 0 ? (
                        <div className="flex items-center justify-center min-h-[40vh]">
                            <p className="text-gray-300 text-sm font-light">No objects found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-2 md:gap-y-16 md:gap-x-8">
                            {/* Animate items in - Staggered Fade */}
                            {filteredProducts.map((product, i) => (
                                <div key={product.id} className="animate-[fadeIn_0.8s_ease-out_forwards]" style={{ animationDelay: `${i * 0.05}ms` }}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
