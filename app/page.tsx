"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function KiswaCatalog() {
  const [activeCategory, setActiveCategory] = useState<"women" | "men">("women")

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Promotional Banner */}
      <section className="bg-black text-white py-2.5 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest font-heading">
        Free standard shipping on orders over 300 SAR* 🚚
      </section>

      {/* Hero Section - Full width lifestyle image */}
      <section className="relative h-[85vh] bg-gray-100 overflow-hidden">
        <img
          src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408929/4_jzf1im.png"
          alt="Brand New Styles"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-16 left-6 md:left-12 max-w-2xl">
          <h1 className="text-5xl md:text-9xl font-bold uppercase mb-4 text-white leading-[0.85]">
            BRAND NEW<br />STYLES
          </h1>
          <p className="text-base md:text-lg text-white mb-8 font-medium max-w-md">
            Elevate your prayer experience with our newest 2026 collection.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 px-10 font-bold uppercase tracking-wider text-sm">
              <Link href="/products">Shop Women</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 px-10 font-bold uppercase tracking-wider text-sm">
              <Link href="/products">Shop Men</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Right Now Section */}
      <section className="py-20 px-2 md:px-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <h2 className="text-4xl md:text-6xl font-bold uppercase">POPULAR RIGHT NOW</h2>

            {/* Category Toggle */}
            <div className="flex bg-gray-100 p-1">
              <button
                onClick={() => setActiveCategory("women")}
                className={`px-8 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === "women"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
                  }`}
              >
                Women
              </button>
              <button
                onClick={() => setActiveCategory("men")}
                className={`px-8 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === "men"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
                  }`}
              >
                Men
              </button>
            </div>
          </div>

          {/* Product Grid - 4 columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-2 md:gap-x-4">
            {/* Product Card 1 */}
            <Link href="/products" className="group">
              <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/1_zimfqs.png"
                  alt="Diamond Velvet Prayer Mat"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="bg-kiswa-gold text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-tight">
                    NEW release
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wide group-hover:underline decoration-2 underline-offset-4">Diamond Velvet Prayer Mat</h3>
                <p className="text-[10px] text-gray-500 uppercase font-medium">Lightweight Fit • 5 Colors</p>
                <p className="text-sm font-black mt-2">299 SAR</p>
              </div>
            </Link>

            {/* Product Card 2 */}
            <Link href="/products" className="group">
              <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/3_lsyqvl.png"
                  alt="Raised Quilting Foam Prayer Mat"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-kiswa-gold text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-tight">
                    NEW release
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wide group-hover:underline decoration-2 underline-offset-4">Raised Quilting Foam Prayer Mat</h3>
                <p className="text-[10px] text-gray-500 uppercase font-medium">Comfort Fit • 3 Colors</p>
                <p className="text-sm font-black mt-2">449 SAR</p>
              </div>
            </Link>

            {/* Product Card 3 */}
            <Link href="/products" className="group">
              <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/5_fi9ezu.png"
                  alt="Portable Travel Prayer Rugs"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-kiswa-gold text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-tight">
                    NEW release
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wide group-hover:underline decoration-2 underline-offset-4">Portable Travel Prayer Rugs</h3>
                <p className="text-[10px] text-gray-500 uppercase font-medium">Travel Fit • Waterproof</p>
                <p className="text-sm font-black mt-2">399 SAR</p>
              </div>
            </Link>

            {/* Product Card 4 */}
            <Link href="/products" className="group">
              <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/6_asqgm2.png"
                  alt="Silk-like Prayer Mat"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-kiswa-gold text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-tight">
                    NEW release
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wide group-hover:underline decoration-2 underline-offset-4">Silk-like Prayer Mat</h3>
                <p className="text-[10px] text-gray-500 uppercase font-medium">Luxury Fit • High Shine</p>
                <p className="text-sm font-black mt-2">349 SAR</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How Do You Pray Section */}
      <section className="py-20 px-6 bg-[#f5f5f5]">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold uppercase mb-12">HOW DO YOU PRAY?</h2>

          {/* Horizontal Scrolling Cards */}
          <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide -mx-6 px-6">
            {[
              { title: "At Home", img: "https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/1_zimfqs.png" },
              { title: "Travel", img: "https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/3_lsyqvl.png" },
              { title: "Mosque", img: "https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/5_fi9ezu.png" },
              { title: "Gift", img: "https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/6_asqgm2.png" },
            ].map((item, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] md:w-[350px]">
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden group">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <h3 className="text-white font-bold text-3xl md:text-4xl uppercase">
                      {item.title}
                    </h3>
                    <div className="h-1 w-12 bg-white mt-2 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Bestsellers */}
      <section className="py-20 px-2 md:px-6">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold uppercase mb-12">THE BESTSELLERS</h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-2 md:gap-x-4">
            {/* Same grid pattern as popular */}
            <Link href="/products" className="group">
              <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/1_zimfqs.png"
                  alt="Product"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wide">Diamond Velvet Prayer Mat</h3>
                <p className="text-[10px] text-gray-500 uppercase font-medium">Bestseller • 5 Colors</p>
                <p className="text-sm font-black mt-2">299 SAR</p>
              </div>
            </Link>

            <Link href="/products" className="group">
              <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/3_lsyqvl.png"
                  alt="Product"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wide">Raised Quilting Foam Prayer Mat</h3>
                <p className="text-[10px] text-gray-500 uppercase font-medium">Extra Comfort • 3 Colors</p>
                <p className="text-sm font-black mt-2">449 SAR</p>
              </div>
            </Link>

            <Link href="/products" className="group">
              <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/5_fi9ezu.png"
                  alt="Product"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wide">Portable Travel Prayer Rugs</h3>
                <p className="text-[10px] text-gray-500 uppercase font-medium">Easy Fold • Waterproof</p>
                <p className="text-sm font-black mt-2">399 SAR</p>
              </div>
            </Link>

            <Link href="/products" className="group">
              <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/6_asqgm2.png"
                  alt="Product"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wide">Silk-like Prayer Mat</h3>
                <p className="text-[10px] text-gray-500 uppercase font-medium">Premium Silk • 2 Colors</p>
                <p className="text-sm font-black mt-2">349 SAR</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* High Impact Banner */}
      <section className="relative h-[60vh] bg-black overflow-hidden group">
        <img
          src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/7_ehleqh.png"
          alt="Craftsmanship"
          className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[2s]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-4xl md:text-8xl font-bold uppercase mb-6 text-white leading-[0.85]">
            CRAFTSMANSHIP<br />MEETS DEVOTION
          </h2>
          <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 px-12 font-black uppercase tracking-widest text-sm h-14">
            <Link href="/products">Shop the Collection</Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[900px] mx-auto text-center">
          <h3 className="font-impact text-4xl md:text-5xl mb-6 uppercase">The Kiswa Standard</h3>
          <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
            <p className="text-lg md:text-xl">
              We are the premier manufacturer of prayer rugs, engineered for the modern worshiper who demands both comfort and spiritual excellence.
            </p>
            <p className="text-lg md:text-xl">
              By combining ancient respect for Islamic traditions with cutting-edge textile innovation, we serve the global Ummah with uncompromising quality and design.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="text-center">
              <p className="text-2xl font-black text-black uppercase">Certified</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quality</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-black uppercase">Tailored</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Service</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-black uppercase">Global</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shipping</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
