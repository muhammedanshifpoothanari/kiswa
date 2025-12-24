"use client"

import { useEffect, useRef } from "react"
import { useCart } from "@/contexts/CartContext"

interface MoyasarPaymentProps {
    amount: number
    currency: string
    description: string
    onComplete: (payment: any) => void
    onFail: (error: any) => void
}

declare global {
    interface Window {
        Moyasar: any
    }
}

export function MoyasarPayment({ amount, currency, description, onComplete, onFail }: MoyasarPaymentProps) {
    const initialized = useRef(false)

    useEffect(() => {
        if (initialized.current) return

        // Load Moyasar CSS
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://cdn.moyasar.com/mpf/1.14.0/moyasar.css"
        document.head.appendChild(link)

        // Load Moyasar JS
        const script = document.createElement("script")
        script.src = "https://cdn.moyasar.com/mpf/1.14.0/moyasar.js"
        script.async = true
        script.onload = () => {
            if (window.Moyasar) {
                try {
                    window.Moyasar.init({
                        element: ".moyasar-form",
                        amount: amount * 100, // Amount in Halalas
                        currency: currency,
                        description: description,
                        publishable_api_key: process.env.NEXT_PUBLIC_MOYASAR_KEY || "pk_test_vcFUHjd8EadAvyR62j872h5hK7r5b9d3e8x5g2h1",
                        callback_url: window.location.href,
                        methods: ["creditcard", "stcpay", "applepay"],
                        apple_pay: {
                            label: "Kiswa Store",
                            validate_merchant_url: "https://api.moyasar.com/v1/apple-pay/initiate"
                        },
                        on_completed: function (payment: any) {
                            onComplete(payment)
                        },
                        on_failed: function (error: any) {
                            onFail(error)
                        }
                    })
                    initialized.current = true
                } catch (e) {
                    console.error("Moyasar init error:", e)
                }
            }
        }
        document.body.appendChild(script)

        return () => {
            // Cleanup if needed
            document.body.removeChild(script)
            document.head.removeChild(link)
        }
    }, [amount, currency, description, onComplete, onFail])

    return (
        <div className="w-full">
            <div className="moyasar-form"></div>
        </div>
    )
}
