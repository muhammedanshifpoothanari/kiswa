"use client"

import { useState } from "react"
import { BackButton } from "@/components/BackButton"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log("Form submitted:", formData)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto">
                    <BackButton className="mb-8" />
                    <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6 text-black">
                        Contact Us
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
                        We're here to help. Reach out with any questions or concerns.
                    </p>
                </div>
            </section>

            {/* Contact Information & Form */}
            <section className="py-16 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid md:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div>
                            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight mb-8 text-black">
                                Get in Touch
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <Mail className="h-6 w-6 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-sm uppercase tracking-wide mb-1">Email</h3>
                                        <a href="mailto:sales@kiswastore.com" className="text-gray-600 hover:text-black transition-colors">
                                            sales@kiswastore.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Phone className="h-6 w-6 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-sm uppercase tracking-wide mb-1">WhatsApp</h3>
                                        <a href="https://wa.me/966123456789" className="text-gray-600 hover:text-black transition-colors">
                                            +966 12 345 6789
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <MapPin className="h-6 w-6 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-sm uppercase tracking-wide mb-1">Location</h3>
                                        <p className="text-gray-600">
                                            Riyadh, Saudi Arabia
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                                <h3 className="font-bold text-sm uppercase tracking-wide mb-3">Business Hours</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Sunday - Thursday</span>
                                        <span className="font-medium">9:00 AM - 7:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Friday - Saturday</span>
                                        <span className="font-medium">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight mb-8 text-black">
                                Send a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wide mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wide mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wide mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        required
                                        className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wide mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-14 bg-black text-white hover:bg-gray-800 rounded-full font-medium text-base flex items-center justify-center gap-2"
                                >
                                    <Send className="h-4 w-4" />
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
