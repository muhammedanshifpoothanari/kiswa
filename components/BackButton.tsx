"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
    label?: string
    className?: string
}

export function BackButton({ label = "Back", className = "" }: BackButtonProps) {
    const router = useRouter()

    return (
        <Button
            variant="ghost"
            onClick={() => router.back()}
            className={`group flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:bg-transparent p-0 h-auto ${className}`}
        >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>{label}</span>
        </Button>
    )
}
