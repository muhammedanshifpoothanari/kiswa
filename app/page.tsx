"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { products } from "@/data/products"
import { ProductCard } from "@/components/ProductCard"
import { DecorativeElements } from "@/components/DecorativeElements"

export default function KiswaCatalog() {
  const [activeCategory, setActiveCategory] = useState<"prayer-rugs" | "abayas" | "gifts">("prayer-rugs")

  // Map UI toggle to data categories for demonstration
  // In a real app, products would have a 'gender' or 'audience' field
  const filteredPopular = products.filter(p => {
    if (activeCategory === "prayer-rugs") return p.category === "Premium Collection" || p.category === "Luxury Collection" || p.category === "Comfort Collection"
    if (activeCategory === "gifts") return p.category === "Travel Collection"
    return false // Abayas - currently no products
  }).slice(0, 4)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Promotional Banner */}
      <section className="text-black py-4 text-center text-[11px] font-bold uppercase tracking-widest font-heading border-b border-golden">
        Free standard shipping on orders over 300 SAR
      </section>

      {/* Hero Section - Full width lifestyle image */}
      <section className="relative h-[70vh] md:h-[60vh] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408929/4_jzf1im.png"
          alt="Brand New Styles"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-10 left-3 md:bottom-10 md:left-6 max-w-4xl">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
            Unleash Your Potential
          </h1>


          <p className="text-base md:text-lg font-medium mb-8 text-white drop-shadow-md max-w-xl">
            The new 2026 Collection is here. Engineered for performance.
          </p>


          <Button
            asChild
            size="lg"
            className="bg-white text-black hover:bg-gray-100 px-8 h-12 font-medium text-base rounded-full"
          >
            <Link href="/products?category=prayer-rugs" aria-label="Shop our collection">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Popular Right Now Section */}
      <section className="relative pt-12 pb-6 px-3 md:px-6 overflow-hidden">
        <DecorativeElements />
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <h2 className="font-heading text-xl md:text-3xl font-bold uppercase tracking-normal text-black">Popular Right Now</h2>

            {/* Category Toggle */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start border border-gray-200 p-1 rounded-3xl">
              <button
                onClick={() => setActiveCategory("prayer-rugs")}
                className={`px-6 py-2 text-sm font-medium transition-all rounded-full whitespace-nowrap ${activeCategory === "prayer-rugs"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-black"
                  }`}
              >
                Prayer Rugs
              </button>
              <button
                onClick={() => setActiveCategory("abayas")}
                className={`px-6 py-2 text-sm font-medium transition-all rounded-full whitespace-nowrap ${activeCategory === "abayas"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-black"
                  }`}
              >
                Abayas
              </button>
              <button
                onClick={() => setActiveCategory("gifts")}
                className={`px-6 py-2 text-sm font-medium transition-all rounded-full whitespace-nowrap ${activeCategory === "gifts"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-black"
                  }`}
              >
                Gifts
              </button>
            </div>
          </div>

          {/* Product Grid - 1 column on mobile for max width, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 md:gap-x-6">
            {filteredPopular.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY (Was How Do You Pray) */}
      <section className="py-12 px-0 md:px-6 bg-white border-t border-gray-100">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="font-heading text-xl md:text-3xl font-bold uppercase mb-12 px-6 md:px-0 tracking-normal text-black">Shop by Category</h2>

          {/* Horizontal Scrolling Cards on Mobile, Grid on Medium+ */}
          <div className="flex overflow-x-auto pb-8 scrollbar-hide px-6 md:px-0 gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
            {[
              { title: "At Home", img: "https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/1_zimfqs.png" },
              { title: "Travel", img: "https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/3_lsyqvl.png" },
              { title: "Mosque", img: "https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/5_fi9ezu.png" },
              { title: "Gifts", img: "https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/6_asqgm2.png" },
            ].map((item, i) => (
              <div key={i} className="flex-shrink-0 w-[300px] md:w-auto group cursor-pointer">
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-white font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight drop-shadow-xl">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High Impact Banner */}
      <section className="relative h-[60vh] bg-black overflow-hidden group">
        <img
          src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/7_ehleqh.png"
          alt="Craftsmanship"
          className="w-full h-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-105 transition-all duration-[2s]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-8 text-white leading-tight tracking-tight">
            Limitless<br />Comfort
          </h2>
          <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 px-16 font-normal text-base h-14 rounded-full">
            <Link href="/products">Shop Collection</Link>
          </Button>
        </div>
      </section>

      {/* The Bestsellers */}
      <section className="py-20 px-3 md:px-6">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="font-heading text-xl md:text-3xl font-bold uppercase mb-12 tracking-normal text-black">The Bestsellers</h2>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 md:gap-x-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-3 md:px-6 bg-black text-white">
        <div className="max-w-[900px] mx-auto text-center">
          <h3 className="font-heading text-xl md:text-3xl mb-8 font-bold uppercase">We Are Kiswa</h3>
          <div className="space-y-6 font-medium leading-relaxed opacity-80">
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              We exist to unite the Ummah through premium design and uncompromising quality.
            </p>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-12 md:gap-24">
            <div className="text-center">
              <p className="text-4xl font-heading font-bold uppercase">100%</p>
              <p className="text-xs font-bold text-gray-400 mt-2 uppercase">Quality</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-heading font-bold uppercase">24/7</p>
              <p className="text-xs font-bold text-gray-400 mt-2 uppercase">Support</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-heading font-bold uppercase">Global</p>
              <p className="text-xs font-bold text-gray-400 mt-2 uppercase">Shipping</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
