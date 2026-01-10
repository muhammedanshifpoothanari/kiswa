"use client"

import { BackButton } from "@/components/BackButton"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 border-b border-gray-100">
                <div className="max-w-[900px] mx-auto">
                    <BackButton className="mb-8" />
                    <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6 text-black">
                        Privacy Policy
                    </h1>
                    <p className="text-sm text-gray-500">Last updated: January 10, 2026</p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 px-6">
                <div className="max-w-[900px] mx-auto prose prose-sm max-w-none">
                    <div className="space-y-8">
                        <div>
                            <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                1. Information We Collect
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We collect information you provide directly to us when you create an account, place an order, or contact us. This includes:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Name, email address, and phone number</li>
                                <li>Shipping and billing addresses</li>
                                <li>Payment information (processed securely through third-party providers)</li>
                                <li>Order history and preferences</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                2. How We Use Your Information
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Process and fulfill your orders</li>
                                <li>Send order confirmations and shipping updates</li>
                                <li>Respond to your questions and provide customer support</li>
                                <li>Send marketing communications (with your consent)</li>
                                <li>Improve our products and services</li>
                                <li>Detect and prevent fraud</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                3. Information Sharing
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We do not sell your personal information. We may share your information with:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
                                <li>Service providers who help us operate our business (shipping, payment processing)</li>
                                <li>Law enforcement when required by law</li>
                                <li>Business partners with your explicit consent</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                4. Cookies and Tracking
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We use cookies and similar technologies to improve your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                5. Data Security
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                6. Your Rights
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                You have the right to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Access and receive a copy of your personal data</li>
                                <li>Correct inaccurate or incomplete data</li>
                                <li>Request deletion of your data</li>
                                <li>Object to or restrict processing of your data</li>
                                <li>Withdraw consent for marketing communications</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                7. Contact Us
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                If you have questions about this Privacy Policy, please contact us at{" "}
                                <a href="mailto:sales@kiswastore.com" className="text-black hover:underline">
                                    sales@kiswastore.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
