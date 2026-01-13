"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function FooterNewsletterForm() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [message, setMessage] = useState("")

    const handleSubscribe = async () => {
        if (!email) return
        setStatus("loading")
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            if (res.ok) {
                setStatus("success")
                setMessage("Code: KISWA10")
            } else {
                setStatus("error")
                setMessage(data.error || "Failed")
            }
        } catch (error) {
            setStatus("error")
            setMessage("Error occurred")
        }
    }

    if (status === "success") {
        return (
            <div className="p-4 bg-white/10 rounded-lg border border-dashed border-white/20 text-center">
                <p className="text-xs text-gray-300 mb-1">Success! Use code:</p>
                <code className="text-lg font-bold tracking-widest text-white">{message}</code>
            </div>
        )
    }

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-12 bg-white/5 border border-white/10 rounded-l-full px-4 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
                />
                <Button
                    onClick={handleSubscribe}
                    disabled={status === "loading"}
                    className="h-12 px-6 bg-white text-black hover:bg-gray-200 font-bold uppercase tracking-wider text-xs rounded-r-full rounded-l-none"
                >
                    {status === "loading" ? "..." : "Sign Up"}
                </Button>
            </div>
            {status === "error" && <p className="text-[10px] text-red-500">{message}</p>}
        </div>
    )
}
