"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [message, setMessage] = useState("")

    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem("hasSeenNewsletter")
        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsOpen(true)
            }, 5000) // Show after 5 seconds
            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        sessionStorage.setItem("hasSeenNewsletter", "true")
    }

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
                setTimeout(() => {
                    handleClose()
                }, 5000)
            } else {
                setStatus("error")
                setMessage(data.error || "Something went wrong")
            }
        } catch (error) {
            setStatus("error")
            setMessage("Failed to subscribe")
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl scale-100 animate-slide-up">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold font-heading uppercase text-black">
                        {status === "success" ? "You're In!" : "Join the Family"}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {status === "success"
                            ? "Use this code at checkout for 10% off:"
                            : <>Sign up for our newsletter and get <span className="font-bold text-black">10% OFF</span> your first order. Be the first to know about new drops.</>}
                    </p>

                    {status === "success" ? (
                        <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <code className="text-xl font-bold tracking-widest text-black">{message}</code>
                        </div>
                    ) : (
                        <div className="space-y-3 pt-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === "loading"}
                                className="w-full h-12 px-4 rounded-full border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                            />
                            {status === "error" && <p className="text-xs text-red-500">{message}</p>}
                            <button
                                onClick={handleSubscribe}
                                disabled={status === "loading"}
                                className="w-full h-12 bg-black text-white font-medium uppercase tracking-wide rounded-full hover:bg-gray-800 transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? "Unlocking..." : "Unlock 10% Off"}
                            </button>
                        </div>
                    )}

                    <p className="text-[10px] text-gray-400 pt-2">
                        By signing up, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    )
}
