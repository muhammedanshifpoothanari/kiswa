import type React from "react"
import type { Metadata } from "next"
import { Inter, Bebas_Neue, Roboto, Roboto_Condensed, Geist, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { CartProvider } from "@/contexts/CartContext"
import { WishlistProvider } from "@/contexts/WishlistContext"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { NewsletterPopup as MyAppNewsletter } from "@/components/NewsletterPopup"
import JsonLd from "@/components/JsonLd"
import "../globals.css"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

const geistSans = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
})

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})

const bebasNeue = Bebas_Neue({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-bebas-neue",
})

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "900"],
    variable: "--font-roboto",
})

const robotoCondensed = Roboto_Condensed({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
    variable: "--font-roboto-condensed",
})

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["700"],
    variable: "--font-montserrat",
})

export const metadata: Metadata = {
    metadataBase: new URL('https://www.kiswastore.com'),
    title: {
        default: "Kiswa — Premium Islamic Lifestyle | Prayer Rugs, Abayas & Gifts",
        template: "%s | Kiswa Store"
    },
    description: "Discover Kiswa's premium collection of luxury prayer rugs, elegant abayas, and curated Islamic gifts. Handcrafted with tradition, designed for the modern Muslim lifestyle. Ships to Saudi Arabia & Worldwide.",

    keywords: [
        "prayer mat", "prayer rug", "sajadah", "luxury prayer mat",
        "abayas", "modern abayas", "black abaya",
        "islamic gifts", "muslim gifts", "ramadan gifts", "eid gifts",
        "muslim fashion", "modest wear",
        "kiswa store", "kiswa",
        "premium islamic lifestyle",
        "prayer mat saudi arabia", "prayer rugs riyadh", "prayer rugs jeddah",
        "custom prayer mats", "corporate islamic gifts"
    ],
    authors: [{ name: "Kiswa Store" }],
    creator: "Kiswa Store",
    publisher: "Kiswa Store",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.kiswastore.com",
        siteName: "Kiswa Store",
        title: "Kiswa — Premium Islamic Lifestyle",
        description: "Experience the art of prayer with our handcrafted collection of premium prayer rugs, elegant abayas, and refined Islamic gifts.",
        images: [
            {
                url: "https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png",
                width: 1200,
                height: 630,
                alt: "Kiswa Store - Premium Islamic Lifestyle",
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Kiswa — Premium Islamic Lifestyle",
        description: "Experience the art of prayer with our handcrafted collection of premium prayer rugs, elegant abayas, and refined Islamic gifts.",
        images: ["https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png"],
        creator: "@kiswastore",
    },
    icons: {
        icon: [
            {
                url: "https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png",
                media: "(prefers-color-scheme: dark)",
            },
        ],
        apple: "https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png",
    },
    verification: {
        google: "OeXIFRAle1B4dLYmgINkuRF0VxiRPdtQCJyjy0fh9AI",
    },

}

export default async function LocaleLayout(props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const params = await props.params;
    const { locale } = params;

    // Ensure that the incoming `locale` is valid
    if (!['en', 'ar'].includes(locale)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <body className={`${inter.variable} ${geistSans.variable} ${bebasNeue.variable} ${roboto.variable} ${robotoCondensed.variable} ${montserrat.variable} font-sans antialiased theme-stitched`}>
                <NextIntlClientProvider messages={messages}>
                    <AnalyticsProvider>
                        <CartProvider>
                            <WishlistProvider>
                                <Header />
                                <main>{props.children}</main>
                                <Footer />
                                <MyAppNewsletter />
                                <WhatsAppButton />
                                <JsonLd />
                                <Analytics />
                            </WishlistProvider>
                        </CartProvider>
                    </AnalyticsProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
