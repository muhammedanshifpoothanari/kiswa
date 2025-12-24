"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"

interface CartIconProps {
    onClick: () => void
}

export function CartIcon({ onClick }: CartIconProps) {
    const { getCartCount } = useCart()
    const count = getCartCount()

    return (
        <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onClick}
            aria-label="Shopping cart"
        >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                    {count > 9 ? "9+" : count}
                </span>
            )}
        </Button>
    )
}
