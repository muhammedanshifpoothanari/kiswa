import { Product } from "@/types/product"

export const products: Product[] = [
    {
        id: "diamond-velvet-prayer-mat",
        name: "Diamond Velvet Prayer Mat",
        category: "Premium Collection",
        price: 299,
        currency: "SAR",
        description: "Lightweight luxury for your spiritual journey. At just 170g, our diamond velvet prayer mat combines portability with premium comfort. Featuring bright, vivid printing of sacred imagery and quality craftsmanship that you can feel in every thread.",
        features: [
            "170g ultra-lightweight design for effortless portability",
            "Vibrant, fade-resistant printing with sacred motifs",
            "Foldable and compact for travel",
            "Custom sizes and colors available"
        ],
        images: [
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/1_zimfqs.png",
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/6_asqgm2.png"
        ],
        specifications: {
            weight: "170g",
            material: "Diamond Velvet",
            size: "Standard"
        },
        inStock: true
    },
    {
        id: "raised-quilting-foam-mat",
        name: "Raised Quilting Foam Prayer Mat",
        category: "Comfort Collection",
        price: 449,
        currency: "SAR",
        description: "Experience unparalleled comfort with our 2cm eco-sponge cushioning. The raised quilting technique brings mosque prints to life, creating a tactile connection to your prayer experience.",
        features: [
            "2cm eco-friendly sponge cushioning for supreme comfort",
            "Mosque prints with raised quilting technique",
            "OEKO-TEX® certified ink, non-toxic dyes",
            "Silicone anti-slip base for stability"
        ],
        images: [
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/3_lsyqvl.png",
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/7_ehleqh.png"
        ],
        specifications: {
            thickness: "2cm",
            material: "Eco-Sponge with Raised Quilting",
            certification: "OEKO-TEX®"
        },
        inStock: true
    },
    {
        id: "portable-travel-prayer-rug",
        name: "Portable Travel Prayer Rug",
        category: "Travel Collection",
        price: 399,
        currency: "SAR",
        description: "Compact elegance meets premium craftsmanship. Our yarn-dyed cut-pile jacquard prayer rugs feature lustrous golden and silver threads with intricate patterns. Perfect for travelers who refuse to compromise on quality.",
        features: [
            "350g premium yarn-dyed cut-pile jacquard",
            "Lustrous golden/silver thread with elegant glitter accents",
            "Machine washable for easy maintenance",
            "Optional gift box packaging available"
        ],
        images: [
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/5_fi9ezu.png",
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408934/8_ucvtca.png"
        ],
        specifications: {
            weight: "350g",
            material: "Yarn-dyed Cut-pile Jacquard",
            care: "Machine Washable"
        },
        inStock: true
    },
    {
        id: "silk-like-prayer-mat",
        name: "Silk-like Prayer Mat",
        category: "Luxury Collection",
        price: 599,
        currency: "SAR",
        description: "Indulge in the ultimate prayer experience. Our creamy soft silk-like fabric delivers an extra soft touch with elegant glitter accents, creating a luxurious foundation for your spiritual practice.",
        features: [
            "800g premium weight with 8mm thickness",
            "480gsm silk-like fabric + 350gsm anti-slip backing",
            "Pure materials only, no recycled content",
            "OEKO-TEX® certified, silicone anti-slip base"
        ],
        images: [
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408930/6_asqgm2.png",
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408933/9_roeh9z.png"
        ],
        specifications: {
            weight: "800g",
            thickness: "8mm",
            material: "480gsm Silk-like Fabric + 350gsm Anti-slip Backing",
            certification: "OEKO-TEX®"
        },
        inStock: true
    },
    {
        id: "premium-velvet-mat-1",
        name: "Premium Velvet Prayer Mat - Kaaba Design",
        category: "Premium Collection",
        price: 349,
        currency: "SAR",
        description: "Beautiful velvet prayer mat featuring the sacred Kaaba design with premium quality materials and vibrant colors.",
        features: [
            "Premium velvet material",
            "Sacred Kaaba design",
            "Fade-resistant printing",
            "Comfortable cushioning"
        ],
        images: [
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408934/10_uhtozv.png",
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408934/11_phpv6q.png"
        ],
        specifications: {
            material: "Premium Velvet",
            design: "Kaaba"
        },
        inStock: true
    },
    {
        id: "mosque-design-mat-1",
        name: "Mosque Design Prayer Mat",
        category: "Premium Collection",
        price: 329,
        currency: "SAR",
        description: "Elegant prayer mat featuring beautiful mosque architecture with intricate details and premium craftsmanship.",
        features: [
            "Detailed mosque architecture design",
            "High-quality printing",
            "Soft and comfortable",
            "Durable construction"
        ],
        images: [
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408553/12_le1znf.jpg",
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408553/13_hlfosb.jpg"
        ],
        specifications: {
            material: "Premium Fabric",
            design: "Mosque Architecture"
        },
        inStock: true
    },
    {
        id: "floral-prayer-mat",
        name: "Floral Design Prayer Mat",
        category: "Luxury Collection",
        price: 379,
        currency: "SAR",
        description: "Luxurious prayer mat with elegant floral patterns, combining traditional Islamic art with modern comfort.",
        features: [
            "Elegant floral patterns",
            "Soft silk-like texture",
            "Anti-slip backing",
            "Premium quality materials"
        ],
        images: [
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408553/14_l0h3kr.jpg",
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408554/15_vwoits.jpg"
        ],
        specifications: {
            material: "Silk-like Fabric",
            design: "Floral"
        },
        inStock: true
    },
    {
        id: "classic-prayer-mat",
        name: "Classic Prayer Mat",
        category: "Comfort Collection",
        price: 279,
        currency: "SAR",
        description: "Classic design prayer mat with comfortable cushioning, perfect for daily prayers.",
        features: [
            "Classic Islamic design",
            "Comfortable padding",
            "Easy to clean",
            "Affordable quality"
        ],
        images: [
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408553/16_uhpabn.jpg",
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408554/17_evnfro.jpg"
        ],
        specifications: {
            material: "Premium Fabric",
            design: "Classic"
        },
        inStock: true
    },
    {
        id: "deluxe-prayer-mat",
        name: "Deluxe Prayer Mat",
        category: "Luxury Collection",
        price: 499,
        currency: "SAR",
        description: "Deluxe prayer mat with superior comfort and elegant design for the discerning worshipper.",
        features: [
            "Superior comfort",
            "Elegant design",
            "Premium materials",
            "Long-lasting durability"
        ],
        images: [
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408554/18_i7kjyl.jpg",
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408553/19_y3qem1.jpg"
        ],
        specifications: {
            material: "Deluxe Fabric",
            design: "Premium"
        },
        inStock: true
    },
    {
        id: "travel-compact-mat",
        name: "Travel Compact Prayer Mat",
        category: "Travel Collection",
        price: 249,
        currency: "SAR",
        description: "Ultra-compact and lightweight prayer mat designed for travelers, easily foldable and portable.",
        features: [
            "Ultra-compact design",
            "Lightweight and portable",
            "Easy to fold",
            "Travel-friendly"
        ],
        images: [
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408553/20_ydvuuq.jpg",
            "https://res.cloudinary.com/diwhddwig/image/upload/v1766408553/21_my96yg.jpg"
        ],
        specifications: {
            weight: "200g",
            material: "Lightweight Fabric",
            design: "Compact"
        },
        inStock: true
    }
]

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter(p => p.category === category)
}

export const categories = [
    "All Products",
    "Prayer Rugs",
    "Abayas",
    "Gifts",
    "Premium Collection",
    "Comfort Collection",
    "Travel Collection",
    "Luxury Collection"
]
