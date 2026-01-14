export default function JsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify([
                    {
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Kiswa Store",
                        "url": "https://www.kiswastore.com",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": {
                                "@type": "EntryPoint",
                                "urlTemplate": "https://www.kiswastore.com/products?search={search_term_string}"
                            },
                            "query-input": "required name=search_term_string"
                        }
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Kiswa Store",
                        "url": "https://www.kiswastore.com",
                        "logo": "https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png",
                        "sameAs": [
                            "https://instagram.com/kiswastore",
                            "https://twitter.com/kiswastore"
                        ],
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+966500000000",
                            "contactType": "customer service",
                            "areaServed": ["SA", "AE", "KW", "BH", "QA", "OM"],
                            "availableLanguage": ["en", "ar"]
                        }
                    }
                ])
            }}
        />
    )
}
