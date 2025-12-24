"use client"

import { Info } from "lucide-react"

export function ProductPaymentPromo({ price }: { price: number }) {
    const tabbyInstallment = (price / 4).toFixed(2)
    const tamaraInstallment = (price / 3).toFixed(2)

    return (
        <div className="space-y-3 my-6">
            {/* Tabby Promo */}
            <div className="flex items-center gap-3 p-3 rounded-lg border border-[#3EEDBF]/30 bg-[#3EEDBF]/5">
                <div className="flex-shrink-0">
                    <svg viewBox="0 0 78 30" className="h-5 w-auto fill-current text-[#3EEDBF]">
                        <path d="M19.16 3.65C10.6 3.65 3.65 10.6 3.65 19.16C3.65 27.72 10.6 34.67 19.16 34.67C27.72 34.67 34.67 27.72 34.67 19.16C34.67 10.6 27.72 3.65 19.16 3.65ZM19.16 0C29.74 0 38.33 8.58 38.33 19.16C38.33 29.74 29.74 38.33 19.16 38.33C8.58 38.33 0 29.74 0 19.16C0 8.58 8.58 0 19.16 0ZM52.47 11.45H47.66V26.85H52.47V11.45ZM52.47 5.79H47.66V9.45H52.47V5.79ZM64.64 11.45H59.83V26.85H64.64V11.45ZM64.64 5.79H59.83V9.45H64.64V5.79ZM78 11.45H73.19V17.76C73.19 20.37 72.8 21.84 72.03 22.61C71.26 23.38 69.8 23.77 67.19 23.77H66.86V26.85H67.19C71.23 26.85 73.83 26.25 75.31 24.77C76.8 23.28 78 20.68 78 17.76V11.45Z" fill="#000000" />
                    </svg>
                </div>
                <div className="text-sm">
                    Split into 4 payments of <span className="font-bold">{tabbyInstallment} SAR</span>.
                    <span className="text-muted-foreground ml-1">No interest.</span>
                </div>
                <Info className="h-4 w-4 text-muted-foreground ml-auto" />
            </div>

            {/* Tamara Promo */}
            <div className="flex items-center gap-3 p-3 rounded-lg border border-[#E7BA3D]/30 bg-[#E7BA3D]/5">
                <div className="flex-shrink-0">
                    <span className="font-bold text-[#d4a01c]">tamara</span>
                </div>
                <div className="text-sm">
                    Split into 3 payments of <span className="font-bold">{tamaraInstallment} SAR</span>.
                    <span className="text-muted-foreground ml-1">No interest.</span>
                </div>
                <Info className="h-4 w-4 text-muted-foreground ml-auto" />
            </div>
        </div>
    )
}
