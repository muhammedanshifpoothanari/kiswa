"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CartIconProps {
    onClick: () => void
}

export function CartIcon({ onClick, className }: CartIconProps & { className?: string }) {
    const { getCartCount } = useCart()
    const count = getCartCount()

    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn("relative hover:bg-transparent transition-transform hover:scale-110", className)}
            onClick={onClick}
            aria-label="Shopping cart"
        >
            <ShoppingCart className="h-6 w-6" />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-black">
                    {count > 9 ? "9+" : count}
                </span>
            )}
        </Button>
    )
}
