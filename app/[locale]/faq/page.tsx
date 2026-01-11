"use client"

import { useState } from "react"
import { BackButton } from "@/components/BackButton"
import { ChevronDown } from "lucide-react"

const faqs = [
    {
        category: "Orders & Shipping",
        questions: [
            {
                q: "How long does shipping take?",
                a: "Standard shipping within Saudi Arabia takes 2-4 business days. Express shipping is available for next-day delivery in major cities."
            },
            {
                q: "Do you ship internationally?",
                a: "Yes, we ship to select countries in the GCC region. International shipping typically takes 5-7 business days."
            },
            {
                q: "How can I track my order?",
                a: "Once your order ships, you'll receive a tracking number via email. You can use this to track your package on our shipping partner's website."
            }
        ]
    },
    {
        category: "Returns & Exchanges",
        questions: [
            {
                q: "What is your return policy?",
                a: "We offer a 30-day return policy for unused items in original packaging. Simply contact us to initiate a return."
            },
            {
                q: "How do I exchange an item?",
                a: "Contact our customer service team with your order number and the item you'd like to exchange. We'll guide you through the process."
            },
            {
                q: "Who pays for return shipping?",
                a: "We provide free return shipping for defective items. For other returns, customers are responsible for return shipping costs."
            }
        ]
    },
    {
        category: "Products",
        questions: [
            {
                q: "Are your prayer mats machine washable?",
                a: "Most of our prayer mats can be spot cleaned. Please check the care instructions on the product page for specific cleaning guidelines."
            },
            {
                q: "What is the memory foam made of?",
                a: "Our memory foam is made from high-density polyurethane foam that's hypoallergenic and provides excellent cushioning for extended prayer sessions."
            },
            {
                q: "Can I personalize my prayer mat?",
                a: "Yes! We offer custom embroidery on select products. Add your personalization during checkout."
            }
        ]
    },
    {
        category: "Payment & Account",
        questions: [
            {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, Amex), Apple Pay, and bank transfers."
            },
            {
                q: "Is my payment information secure?",
                a: "Yes, all transactions are encrypted and processed through secure payment gateways. We never store your credit card information."
            },
            {
                q: "Do I need an account to place an order?",
                a: "No, you can checkout as a guest. However, creating an account allows you to track orders and save your information for faster checkout."
            }
        ]
    }
]

export default function FAQPage() {
    const [openItems, setOpenItems] = useState<string[]>([])

    const toggleItem = (id: string) => {
        setOpenItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto">
                    <BackButton className="mb-8" />
                    <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6 text-black">
                        FAQ
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
                        Find answers to commonly asked questions about our products and services.
                    </p>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-16 px-6">
                <div className="max-w-[900px] mx-auto space-y-12">
                    {faqs.map((category, catIndex) => (
                        <div key={catIndex}>
                            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight mb-6 text-black">
                                {category.category}
                            </h2>
                            <div className="space-y-4">
                                {category.questions.map((faq, qIndex) => {
                                    const id = `${catIndex}-${qIndex}`
                                    const isOpen = openItems.includes(id)

                                    return (
                                        <div key={id} className="border border-gray-200 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => toggleItem(id)}
                                                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors text-left"
                                            >
                                                <span className="font-bold text-sm uppercase tracking-wide pr-4">
                                                    {faq.q}
                                                </span>
                                                <ChevronDown
                                                    className={`h-5 w-5 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>
                                            {isOpen && (
                                                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                                                    {faq.a}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-[900px] mx-auto text-center">
                    <h2 className="font-heading text-2xl font-bold uppercase tracking-tight mb-4 text-black">
                        Still Have Questions?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Our customer service team is here to help.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </div>
    )
}
