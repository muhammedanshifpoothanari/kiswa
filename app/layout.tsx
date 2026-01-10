import type React from "react"
import type { Metadata } from "next"
import { Inter, Bebas_Neue, Roboto, Roboto_Condensed, Geist, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/contexts/CartContext"
import { WishlistProvider } from "@/contexts/WishlistContext"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import "./globals.css"

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
  title: "Kiswa — Premium Islamic Lifestyle",
  description:
    "Experience the art of prayer with our handcrafted collection of premium prayer rugs, elegant abayas, and refined Islamic gifts",
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
      {
        url: "https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png",

      },
    ],
    apple: "https://res.cloudinary.com/diwhddwig/image/upload/v1764833035/kiswa-logo_fpkm0n.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistSans.variable} ${bebasNeue.variable} ${roboto.variable} ${robotoCondensed.variable} ${montserrat.variable} font-sans antialiased`}>
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
            <Analytics />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
