import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ProductCard } from "@/components/ProductCard"
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { PopularSection } from "@/components/PopularSection"
import { CategorySection } from "@/components/CategorySection"
import { getCategories, getReviews, getHomePageProducts } from "@/app/actions/home"

export default async function KiswaCatalog() {
    const t = await getTranslations();

    // Parallel Fetching
    const [categories, reviews, productData] = await Promise.all([
        getCategories(),
        getReviews(),
        getHomePageProducts()
    ]);

    const { all: products, bestsellers } = productData;

    // Filter products for category sections
    const prayerRugs = products.filter((p: any) =>
        p.category === 'Prayer Rugs' ||
        ['Premium Collection', 'Luxury Collection', 'Comfort Collection'].includes(p.category)
    );

    const abayas = products.filter((p: any) =>
        p.category === 'Abayas' ||
        (p.category && p.category.toLowerCase().includes('abaya'))
    );

    const gifts = products.filter((p: any) =>
        p.category === 'Gifts' ||
        p.category === 'Travel Collection' ||
        (p.category && p.category.toLowerCase().includes('gift'))
    );

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            {/* Promotional Banner */}
            <section className="text-black py-3 text-center text-xs font-bold uppercase tracking-widest font-heading">
                {t('Promo.shipping')}
            </section>

            {/* Hero Section - Full width clickable image */}
            <Link href="/products?category=prayer-rugs" className="block relative h-[60vh] md:h-[65vh] bg-gray-200 overflow-hidden group cursor-pointer">
                <img
                    src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408929/4_jzf1im.png"
                    alt="Brand New Styles"
                    className="w-full h-full object-cover opacity-90 transition-transform duration-[2s] group-hover:scale-105"
                />
            </Link>

            {/* Popular Right Now Section (Client Component) */}
            <PopularSection products={products} />

            {/* SHOP BY CATEGORY */}
            <section className="py-12 px-0 md:px-6 bg-white">
                <div className="max-w-[1600px] mx-auto">
                    <h2 className="font-heading text-xl md:text-3xl font-bold uppercase mb-8 px-6 md:px-0 tracking-normal text-black text-center md:text-left">
                        {t('Categories.title')}
                    </h2>

                    {/* Horizontal Scrolling Cards */}
                    <div className="flex overflow-x-auto pb-8 scrollbar-hide px-6 md:px-0 gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
                        {categories.map((item, i) => (
                            <Link href={`/products?category=${item.slug}`} key={i} className="flex-shrink-0 w-[240px] md:w-auto group cursor-pointer block relative">
                                <div className="relative aspect-[3/4] bg-gray-900 overflow-hidden rounded-xl shadow-sm">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-95 group-hover:opacity-100"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 font-heading text-lg">No Image</div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-6 left-6 rtl:right-6 rtl:left-auto">
                                        <h3 className="text-white font-heading font-bold text-2xl uppercase tracking-wide leading-none group-hover:text-gray-200 transition-colors">
                                            {item.name}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* High Impact Banner */}
            <section className="relative h-[60vh] md:h-[70vh] bg-black overflow-hidden group my-8 md:my-0">
                <img
                    src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/7_ehleqh.png"
                    alt="Craftsmanship"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-105 transition-all duration-[2s]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-6 text-white leading-none tracking-tight max-w-4xl">
                        {t('Banner.title')}
                    </h2>
                    <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100 px-10 font-medium text-base h-12 rounded-full uppercase tracking-wide transition-all shadow-xl">
                        <Link href="/products">{t('Banner.cta')}</Link>
                    </Button>
                </div>
            </section>

            {/* The Bestsellers */}
            <section className="py-12 px-3 md:px-6 bg-gray-50">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 px-2">
                        <h2 className="font-heading text-xl md:text-3xl font-bold uppercase tracking-normal text-black leading-none">
                            {t('Bestsellers.title')}
                        </h2>
                        <Link href="/products" className="hidden md:block text-sm font-medium uppercase tracking-wide border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors">
                            View All Products
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 md:gap-x-6">
                        {bestsellers.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Button asChild className="w-full bg-black text-white font-heading uppercase text-lg h-12">
                            <Link href="/products">View All Products</Link>
                        </Button>
                    </div>
                </div>
            </section>

       

            {/* Reviews / About Section */}
            <section className="py-16 px-4 md:px-6 bg-black text-white">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h3 className="font-heading text-xl md:text-3xl mb-12 font-bold uppercase tracking-normal">Real Stories</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {reviews.map((review, i) => (
                            <div key={i} className="p-8 border-2 border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left flex flex-col">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-white fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                </div>
                                <p className="text-xl font-bold leading-relaxed mb-6 opacity-90 flex-grow font-heading tracking-wide">
                                    "{review.content}"
                                </p>
                                <div className="border-t border-white/10 pt-4">
                                    <p className="font-black uppercase tracking-widest text-sm text-white">{review.user}</p>
                                    {review.role && <p className="text-xs text-gray-400 mt-1 uppercase font-bold">{review.role}</p>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-12 md:gap-32 border-t border-white/10 pt-12">
                        <div className="text-center group">
                            <p className="text-3xl md:text-4xl font-heading font-bold uppercase group-hover:text-gray-300 transition-colors text-white">100%</p>
                            <p className="text-xs font-medium text-gray-400 mt-2 uppercase tracking-wide">{t('Footer.stats.quality')}</p>
                        </div>
                        <div className="text-center group">
                            <p className="text-3xl md:text-4xl font-heading font-bold uppercase group-hover:text-gray-300 transition-colors text-white">24/7</p>
                            <p className="text-xs font-medium text-gray-400 mt-2 uppercase tracking-wide">{t('Footer.stats.support')}</p>
                        </div>
                        <div className="text-center group">
                            <p className="text-3xl md:text-4xl font-heading font-bold uppercase group-hover:text-gray-300 transition-colors text-white">Global</p>
                            <p className="text-xs font-medium text-gray-400 mt-2 uppercase tracking-wide">{t('Footer.stats.shipping')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
