import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Link from 'next/link'
import { ProductCard } from "@/components/ProductCard"
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { PopularSection } from "@/components/PopularSection"
import { CategorySection } from "@/components/CategorySection"
import { StoryCategories } from "@/components/StoryCategories"
import { getCategories, getReviews, getHomePageProducts } from "@/app/actions/home"

export default async function KiswaCatalog() {
    const t = await getTranslations();

    // Parallel Fetching
    const [categories, reviews, productData] = await Promise.all([
        getCategories(),
        getReviews(),
        getHomePageProducts()
    ]);

    const { bestsellers } = productData;

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">

            {/* The Hero: Full-Bleed, Calm, Inevitable */}
            <section className="relative h-[50vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://res.cloudinary.com/diwhddwig/image/upload/v1768405827/WhatsApp_Image_2026-01-14_at_6.49.07_PM_o2jqzu.jpg"
                        alt="Hero"
                        className="w-full h-full object-cover object-center  animate-[kenburns_20s_ease-out_infinite_alternate]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
                    <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-8 leading-[1.1] opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards] translate-y-4">
                        Premium Prayer Rugs<br />& Islamic Gifts.
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl font-normal tracking-wide max-w-lg mb-12 leading-relaxed opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards] translate-y-4">
                        Crafted for comfort. Designed for the modern home.
                    </p>
                    <div className="opacity-0 animate-[fadeIn_1s_ease-out_1.1s_forwards] translate-y-4">
                        <Button asChild className="bg-white text-black hover:bg-white/90 rounded-full px-10 h-14 text-[13px] font-bold tracking-[0.1em] uppercase transition-all transform hover:scale-105 border-0">
                            <Link href="/products?category=prayer-rugs" className="flex items-center gap-2">
                                Shop Collection
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Scroll Indicator - Minimal Mouse Animation */}
                <Link href="#top-collections" className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 opacity-70 z-20 cursor-pointer hover:opacity-100 transition-opacity">
                    <span className="text-[10px] uppercase tracking-widest text-white/80 font-medium">Scroll</span>
                    <div className="w-[30px] h-[50px] rounded-[15px] border-2 border-white/30 flex justify-center p-2 backdrop-blur-sm">
                        <div className="w-1 h-3 bg-white/80 rounded-full animate-scroll-wheel shadow-sm" />
                    </div>
                </Link>
            </section>


            {/* Story Categories - Highlights */}
            <StoryCategories categories={categories} />

            {/* Popular Right Now - The Carousel */}
            <section className="bg-white">
                <PopularSection products={productData.all} />
            </section>



            {/* Feature Banner - The Cinematic */}
            <section className="pt-30 px-6 md:px-12">
                <div className="relative h-[80vh] w-full overflow-hidden rounded-[2rem] mx-auto max-w-[1800px]">
                    <img
                        src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/7_ehleqh.png"
                        alt="Editorial"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-6 opacity-80">Limited Series</span>
                        <h2 className="text-white text-5xl md:text-8xl font-medium tracking-tighter mb-10 max-w-5xl leading-none">
                            Unapologetically<br />Premium.
                        </h2>
                        <Button asChild className="bg-white/10 backdrop-blur-xl text-white hover:bg-white text-black hover:text-black rounded-full px-12 h-14 text-[13px] uppercase tracking-[0.2em] font-medium transition-all duration-500 border border-white/20 hover:border-white">
                            <Link href="/products?category=premium-collection">Discover</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Bestsellers - The Objects */}
            <section className="pt-32 px-6 md:px-12 bg-white pb-10">
                <div className="max-w-[1800px] mx-auto">
                    <div className="mb-24 flex items-end justify-between">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-black mb-4">
                                Essentials.
                            </h2>
                            <p className="text-gray-500 text-lg font-light tracking-wide max-w-md">
                                Objects designed to be used, cherished, and kept.
                            </p>
                        </div>
                        <Link href="/products" className="hidden md:block text-sm font-medium tracking-widest uppercase border-b border-black pb-1 hover:opacity-50 transition-opacity mb-2">
                            View All
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
                        {bestsellers.slice(0, 4).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="flex w-full justify-center pt-14">
                        <Link href="/products" className=" md:block text-sm font-medium tracking-widest uppercase border-b border-black pb-1 hover:opacity-50 transition-opacity mb-2">
                            View All
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
