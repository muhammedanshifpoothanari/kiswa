"use client"

import { Button } from "@/components/ui/button"
import { useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"

export function LanguageSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const toggleLanguage = () => {
        const newLocale = locale === "en" ? "ar" : "en"
        // Replace the locale in the pathname
        // Pathname usually comes as /en/some-path or /ar/some-path
        // We want to replace the first segment

        const segments = pathname.split('/')
        // segments[0] is empty, segments[1] is the locale
        segments[1] = newLocale
        const newPath = segments.join('/')

        router.push(newPath)
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="font-medium"
        >
            {locale === "en" ? "العربية" : "English"}
        </Button>
    )
}
