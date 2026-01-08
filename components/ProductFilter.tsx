"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"

interface ProductFilterProps {
    categories: string[]
    selectedCategory: string
    onSelectCategory: (category: string) => void
}

export function ProductFilter({ categories, selectedCategory, onSelectCategory }: ProductFilterProps) {
    const [open, setOpen] = useState(false)

    const handleSelect = (category: string) => {
        onSelectCategory(category)
        setOpen(false)
    }

    return (
        <>
            {/* Mobile Filter (Sheet/Drawer) */}
            <div className="md:hidden w-full">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full flex justify-between items-center h-12 border-black/10">
                            <span className="text-xs font-bold uppercase tracking-widest">Filter Products</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-gray-400 font-bold uppercase">{selectedCategory}</span>
                                <SlidersHorizontal className="h-4 w-4" />
                            </div>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="rounded-t-[20px] px-6 pb-12">
                        <SheetHeader className="mb-8 text-left">
                            <SheetTitle className="text-2xl font-bold uppercase tracking-tight">Select Category</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleSelect(category)}
                                    className={`w-full text-left py-4 border-b border-gray-100 flex justify-between items-center transition-all ${selectedCategory === category
                                        ? "text-black font-black"
                                        : "text-gray-500 font-medium"
                                        }`}
                                >
                                    <span className="text-sm uppercase tracking-widest">{category}</span>
                                    {selectedCategory === category && (
                                        <div className="h-2 w-2 bg-black rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Filter (Horizontal List) */}
            <div className="hidden md:flex flex-wrap gap-3">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === category
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </>
    )
}
