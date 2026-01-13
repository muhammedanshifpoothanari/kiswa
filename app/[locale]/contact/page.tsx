"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, MapPin, Mail, Phone, Clock } from "lucide-react"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            if (res.ok) {
                setStatus("success")
                setFormData({ name: "", email: "", subject: "", message: "" })
            } else {
                setStatus("error")
            }
        } catch (error) {
            setStatus("error")
        }
    }

    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4 tracking-tight">Contact Us</h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        We're here to help. Reach out to us for any questions about our products, shipping, or your order.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-lg font-bold uppercase mb-1">Visit Us</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        King Abdulaziz Rd<br />
                                        Al Malqa District<br />
                                        Riyadh 13521, Saudi Arabia
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-lg font-bold uppercase mb-1">Email Us</h3>
                                    <p className="text-gray-600 text-sm mb-1">For general inquiries:</p>
                                    <a href="mailto:support@kiswastore.com" className="font-medium hover:underline">support@kiswastore.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-lg font-bold uppercase mb-1">Working Hours</h3>
                                    <p className="text-gray-600 text-sm">
                                        Saturday - Thursday: 10am - 10pm<br />
                                        Friday: 4pm - 10pm
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Map or Image Placeholder */}
                        <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                            <img
                                src="https://res.cloudinary.com/diwhddwig/image/upload/v1766408929/4_jzf1im.png"
                                className="w-full h-full object-cover opacity-80"
                                alt="Location"
                            />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 md:p-12 rounded-3xl">
                        <h2 className="font-heading text-2xl font-bold uppercase mb-6">Send a Message</h2>
                        {status === "success" ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">Message Sent!</h3>
                                <p className="text-gray-500 text-sm">We'll get back to you as soon as possible.</p>
                                <Button
                                    className="mt-6 bg-transparent border border-black text-black hover:bg-black hover:text-white rounded-full"
                                    onClick={() => setStatus("idle")}
                                >
                                    Send Another
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Message</label>
                                    <textarea
                                        required
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full h-40 p-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
                                        placeholder="Type your message here..."
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full h-14 bg-black text-white hover:bg-gray-800 rounded-full font-bold uppercase tracking-widest text-sm"
                                >
                                    {status === "loading" ? "Sending..." : "Send Message"}
                                </Button>
                                {status === "error" && (
                                    <p className="text-xs text-center text-red-500 font-medium">Failed to send message. Please try again.</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
