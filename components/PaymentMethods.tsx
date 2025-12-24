"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function TabbyWidget({ amount }: { amount: number }) {
    const installment = (amount / 4).toFixed(2)

    return (
        <div className="border border-[#3EEDBF] bg-[#3EEDBF]/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    {/* SVG Logo for Tabby */}
                    <svg viewBox="0 0 78 30" className="h-8 w-auto fill-current text-[#3EEDBF]">
                        <path d="M19.16 3.65C10.6 3.65 3.65 10.6 3.65 19.16C3.65 27.72 10.6 34.67 19.16 34.67C27.72 34.67 34.67 27.72 34.67 19.16C34.67 10.6 27.72 3.65 19.16 3.65ZM19.16 0C29.74 0 38.33 8.58 38.33 19.16C38.33 29.74 29.74 38.33 19.16 38.33C8.58 38.33 0 29.74 0 19.16C0 8.58 8.58 0 19.16 0ZM52.47 11.45H47.66V26.85H52.47V11.45ZM52.47 5.79H47.66V9.45H52.47V5.79ZM64.64 11.45H59.83V26.85H64.64V11.45ZM64.64 5.79H59.83V9.45H64.64V5.79ZM78 11.45H73.19V17.76C73.19 20.37 72.8 21.84 72.03 22.61C71.26 23.38 69.8 23.77 67.19 23.77H66.86V26.85H67.19C71.23 26.85 73.83 26.25 75.31 24.77C76.8 23.28 78 20.68 78 17.76V11.45Z" fill="#000000" />
                    </svg>
                    <span className="font-bold text-lg">tabby</span>
                </div>
                <div className="text-right">
                    <span className="block font-medium">Split into 4 payments</span>
                    <span className="text-sm text-muted-foreground">0% interest</span>
                </div>
            </div>

            <div className="flex justify-between items-center text-sm mb-4">
                <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs mb-1">1</div>
                    <span className="font-bold">Today</span>
                    <span>{installment} SAR</span>
                </div>
                <div className="h-[1px] bg-border flex-1 mx-2"></div>
                <div className="flex flex-col items-center text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center text-xs mb-1">2</div>
                    <span>1 Month</span>
                    <span>{installment} SAR</span>
                </div>
                <div className="h-[1px] bg-border flex-1 mx-2"></div>
                <div className="flex flex-col items-center text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center text-xs mb-1">3</div>
                    <span>2 Months</span>
                    <span>{installment} SAR</span>
                </div>
                <div className="h-[1px] bg-border flex-1 mx-2"></div>
                <div className="flex flex-col items-center text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center text-xs mb-1">4</div>
                    <span>3 Months</span>
                    <span>{installment} SAR</span>
                </div>
            </div>

            <div className="bg-background/50 rounded-lg p-3 text-xs text-muted-foreground">
                No interest. No fees. Shariah-compliant.
            </div>
        </div>
    )
}

export function TamaraWidget({ amount }: { amount: number }) {
    const installment = (amount / 3).toFixed(2)

    return (
        <div className="border border-[#E7BA3D] bg-[#E7BA3D]/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-[#d4a01c]">tamara</span>
                </div>
                <div className="text-right">
                    <span className="block font-medium">Split into 3 payments</span>
                    <span className="text-sm text-muted-foreground">0% interest</span>
                </div>
            </div>

            <div className="flex justify-between items-center text-sm mb-4">
                <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs mb-1">1</div>
                    <span className="font-bold">Today</span>
                    <span>{installment} SAR</span>
                </div>
                <div className="h-[1px] bg-border flex-1 mx-2"></div>
                <div className="flex flex-col items-center text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center text-xs mb-1">2</div>
                    <span>1 Month</span>
                    <span>{installment} SAR</span>
                </div>
                <div className="h-[1px] bg-border flex-1 mx-2"></div>
                <div className="flex flex-col items-center text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center text-xs mb-1">3</div>
                    <span>2 Months</span>
                    <span>{installment} SAR</span>
                </div>
            </div>

            <div className="bg-background/50 rounded-lg p-3 text-xs text-muted-foreground">
                No late fees, Shariah-compliant.
            </div>
        </div>
    )
}

export function BankTransferInfo() {
    return (
        <div className="space-y-4">
            <div className="bg-secondary/30 rounded-xl p-4 border border-border">
                <h4 className="font-medium mb-3">Al Rajhi Bank</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Name</span>
                        <span className="font-medium">Kiswa Premium Trading Est.</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">IBAN</span>
                        <span className="font-mono bg-background px-2 py-0.5 rounded border border-border">SA75 8000 0000 0000 0123 4567</span>
                    </div>
                </div>
            </div>

            <div className="bg-secondary/30 rounded-xl p-4 border border-border">
                <h4 className="font-medium mb-3">SNB (Al Ahli)</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Name</span>
                        <span className="font-medium">Kiswa Premium Trading Est.</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">IBAN</span>
                        <span className="font-mono bg-background px-2 py-0.5 rounded border border-border">SA34 1000 0000 0000 0000 9876</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 text-sm text-yellow-600 bg-yellow-500/10 p-3 rounded-lg">
                <div className="mt-0.5">⚠️</div>
                <p>Please transfer the exact amount and keep your receipt. Your order will be processed once funds are received.</p>
            </div>
        </div>
    )
}
