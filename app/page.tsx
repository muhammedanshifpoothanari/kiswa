"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function KiswaCatalog() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Apple-style hero with large typography */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-balance">
            Sacred Comfort.
            <br />
            Timeless Craft.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance leading-relaxed">
            Experience the art of prayer with handcrafted prayer rugs and Islamic gifts designed for those who value
            quality and spiritual connection.
          </p>
          <Button size="lg" className="rounded-full h-12 px-8 text-base" asChild>
            <Link href="/products">
              Explore Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Hero Image - Large product showcase */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-secondary">
            <img
              src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408929/4_jzf1im.png"
              alt="Sacred Comfort Premium Prayer Rugs Collection"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Product 1 - Diamond Velvet Prayer Mat */}
      <section id="collection" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="text-sm font-medium text-accent uppercase tracking-wider">Premium Collection</span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mt-4 mb-6">Diamond Velvet Prayer Mat</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Lightweight luxury for your spiritual journey. At just 170g, our diamond velvet prayer mat combines
                portability with premium comfort. Featuring bright, vivid printing of sacred imagery and quality
                craftsmanship that you can feel in every thread.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">
                    170g ultra-lightweight design for effortless portability
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">Vibrant, fade-resistant printing with sacred motifs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">Foldable and compact for travel</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">Custom sizes and colors available</span>
                </li>
              </ul>
              <Button variant="outline" className="rounded-full bg-transparent" asChild>
                <Link href="/products/diamond-velvet-prayer-mat">Learn More</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
                <img
                  src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/1_zimfqs.png"
                  alt="Diamond Velvet Prayer Mat with Dome of the Rock"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product 2 - Raised Quilting Foam Prayer Mat */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-card">
                <img
                  src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/3_lsyqvl.png"
                  alt="Raised Quilting Foam Prayer Mat"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-accent uppercase tracking-wider">Comfort Collection</span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mt-4 mb-6">
                Raised Quilting Foam Prayer Mat
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Experience unparalleled comfort with our 2cm eco-sponge cushioning. The raised quilting technique brings
                mosque prints to life, creating a tactile connection to your prayer experience.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">2cm eco-friendly sponge cushioning for supreme comfort</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">Mosque prints with raised quilting technique</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">OEKO-TEX® certified ink, non-toxic dyes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">Silicone anti-slip base for stability</span>
                </li>
              </ul>
              <Button variant="outline" className="rounded-full bg-transparent" asChild>
                <Link href="/products/raised-quilting-foam-mat">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product 3 - Portable Travel Prayer Rugs */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="text-sm font-medium text-accent uppercase tracking-wider">Travel Collection</span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mt-4 mb-6">Portable Travel Prayer Rugs</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Compact elegance meets premium craftsmanship. Our yarn-dyed cut-pile jacquard prayer rugs feature
                lustrous golden and silver threads with intricate patterns. Perfect for travelers who refuse to
                compromise on quality.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">350g premium yarn-dyed cut-pile jacquard</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">
                    Lustrous golden/silver thread with elegant glitter accents
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">Machine washable for easy maintenance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">Optional gift box packaging available</span>
                </li>
              </ul>
              <Button variant="outline" className="rounded-full bg-transparent" asChild>
                <Link href="/products/portable-travel-prayer-rug">Learn More</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
                <img
                  src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/5_fi9ezu.png"
                  alt="Portable Travel Prayer Rugs Collection"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product 4 - Silk-like Prayer Mat */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-card">
                <img
                  src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/6_asqgm2.png"
                  alt="Silk-like Prayer Mat with floral design"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-accent uppercase tracking-wider">Luxury Collection</span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mt-4 mb-6">Silk-like Prayer Mat</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Indulge in the ultimate prayer experience. Our creamy soft silk-like fabric delivers an extra soft touch
                with elegant glitter accents, creating a luxurious foundation for your spiritual practice.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">800g premium weight with 8mm thickness</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">480gsm silk-like fabric + 350gsm anti-slip backing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">Pure materials only, no recycled content</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <span className="text-muted-foreground">OEKO-TEX® certified, silicone anti-slip base</span>
                </li>
              </ul>
              <Button variant="outline" className="rounded-full bg-transparent" asChild>
                <Link href="/products/silk-like-prayer-mat">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section id="craftsmanship" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-8">Craftsmanship meets devotion</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12 text-balance">
            Every Kiswa product is a testament to our commitment to quality, combining traditional Islamic artistry with
            modern manufacturing excellence. We use only certified, non-toxic materials and sustainable practices.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-xl font-medium mb-3">Premium Materials</h3>
              <p className="text-muted-foreground leading-relaxed">
                OEKO-TEX® certified inks, pure fabrics, and eco-friendly cushioning ensure safety and comfort.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Deutsche Qualität</h3>
              <p className="text-muted-foreground leading-relaxed">
                German quality standards guide every aspect of our design and production process.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Custom Service</h3>
              <p className="text-muted-foreground leading-relaxed">
                Personalized sizes, colors, and designs available to match your unique preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Grid */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card">
              <img
                src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/7_ehleqh.png"
                alt="Comfort Foam Prayer Mat Details"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card">
              <img
                src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408934/8_ucvtca.png"
                alt="Diamond Velvet Prayer Mat Details"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="/images/screenshot-201447-07-04-20at-202.png"
                alt="Kiswa Manufacturing"
                className="w-full rounded-2xl"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">About Kiswa</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We are a professional manufacturer of premium prayer rugs, designed to bring comfort, cleanliness, and
                spiritual focus to every worship moment.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With deep respect for Islamic traditions, we serve customers across the Middle East with certified
                quality, elegant design, and tailored service. Every product embodies our commitment to excellence and
                devotion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-8">Get in touch</h2>
          <p className="text-xl text-muted-foreground mb-12 text-balance">
            Have questions about our products or need custom solutions? We're here to help.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto mb-12">
            <div>
              <h3 className="font-medium mb-2">Office</h3>
              <p className="text-muted-foreground">+86 8287 0799</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Email</h3>
              <p className="text-muted-foreground">info@byyounghome.com</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">WhatsApp</h3>
              <p className="text-muted-foreground">+86 181 5737 3928</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">WeChat</h3>
              <p className="text-muted-foreground">+86 132 5232 9358</p>
            </div>
          </div>

          <div className="text-muted-foreground mb-8">
            <p className="font-medium mb-1">Factory Address</p>
            <p>No. 1-1Building, Beichuang Industry Park</p>
            <p>Nanhu District, Jiaxing, Zhejiang Province, China</p>
          </div>

          <Button size="lg" className="rounded-full h-12 px-8" asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
