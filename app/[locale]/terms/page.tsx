"use client"

import { BackButton } from "@/components/BackButton"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 border-b border-gray-100">
                <div className="max-w-[900px] mx-auto">
                    <BackButton className="mb-8" />
                    <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6 text-black">
                        Terms of Service
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
                                1. Acceptance of Terms
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                2. Use of Website
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others. You must not:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Use the website in any way that violates applicable laws</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Transmit any harmful or malicious code</li>
                                <li>Collect or harvest any information from the website</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                3. Product Information
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, or error-free. We reserve the right to correct errors and update information at any time.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                4. Orders and Payment
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order. Payment must be received before orders are processed. Prices are in Saudi Riyals (SAR) and include applicable taxes.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                5. Intellectual Property
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                All content on this website, including text, graphics, logos, and images, is the property of Kiswa and protected by copyright laws. You may not reproduce, distribute, or create derivative works without our written permission.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                6. Limitation of Liability
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                To the fullest extent permitted by law, Kiswa shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                7. Governing Law
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                These Terms of Service are governed by the laws of Saudi Arabia. Any disputes shall be resolved in the courts of Riyadh, Saudi Arabia.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                8. Changes to Terms
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the modified terms.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-black">
                                9. Contact Information
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                For questions about these Terms of Service, contact us at{" "}
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
