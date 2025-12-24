"use client"

import { useState } from "react"
import { products, categories } from "@/data/products"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

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
        <div className="min-h-screen bg-background">
            {/* Page Header */}
            <section className="pt-32 pb-12 px-6 border-b border-border">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Our Collection</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Discover our premium range of prayer mats, crafted with devotion and designed for comfort.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 px-6 border-b border-border bg-secondary/30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "outline"}
                                    size="sm"
                                    className="rounded-full"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search products..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-muted-foreground mb-6">
                                Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
