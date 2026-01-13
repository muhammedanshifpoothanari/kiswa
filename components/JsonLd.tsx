export default function JsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Store",
                    "name": "Kiswa Store",
                    "image": "https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png",
                    "description": "Premium Islamic Lifestyle Store - Prayer Rugs, Abayas, and Gifts.",
                    "@id": "https://www.kiswastore.com",
                    "url": "https://www.kiswastore.com",
                    "telephone": "+966500000000",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Olaya Street",
                        "addressLocality": "Riyadh",
                        "postalCode": "12211",
                        "addressCountry": "SA"
                    },
                    "priceRange": "$$",
                    "sameAs": [
                        "https://instagram.com/kiswastore",
                        "https://twitter.com/kiswastore"
                    ]
                })
            }}
        />
    )
}
