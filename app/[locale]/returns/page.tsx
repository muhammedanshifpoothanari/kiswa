import { useTranslations } from 'next-intl';

export default function ReturnsPage() {
    const t = useTranslations('Returns');

    return (
        <div className="bg-white min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-black mb-6">
                    Returns & Refunds.
                </h1>
                <p className="text-gray-500 text-lg font-light tracking-wide mb-16 leading-relaxed">
                    Our commitment to your satisfaction and consumer rights compliance.
                </p>

                <div className="space-y-12 text-sm md:text-base leading-relaxed text-gray-600 font-normal">
                    <section>
                        <h3 className="text-black font-medium uppercase tracking-widest text-xs mb-4">1. Return Policy Overview</h3>
                        <p>
                            In compliance with the regulations of the Ministry of Commerce in the Kingdom of Saudi Arabia, we offer a transparent return and exchange policy.
                            You have the right to return or exchange products within <strong>7 days</strong> from the date of receipt, provided the product is in its original condition, unused, and in its original packaging.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-black font-medium uppercase tracking-widest text-xs mb-4">2. Conditions for Return</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>The product must be unused and in the same condition that you received it.</li>
                            <li>It must be in the original packaging with all tags and labels attached.</li>
                            <li>Proof of purchase (order reference or receipt) is required.</li>
                            <li>Personalized or custom-made items cannot be returned unless there is a manufacturing defect.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-black font-medium uppercase tracking-widest text-xs mb-4">3. Refund Process</h3>
                        <p>
                            Once your return is received and inspected, we will notify you of the approval or rejection of your refund.
                            <br /><br />
                            If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment within <strong>7-14 business days</strong>, depending on your bank's processing time.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-black font-medium uppercase tracking-widest text-xs mb-4">4. Defective or Damaged Items</h3>
                        <p>
                            If you receive a defective or damaged item, please contact us immediately (within 3 days of receipt). We will arrange for a replacement or a full refund, including shipping costs.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-black font-medium uppercase tracking-widest text-xs mb-4">5. Shipping Costs</h3>
                        <p>
                            Shipping costs are non-refundable unless the return is due to our error (e.g., wrong item sent or defective product). If you receive a refund, the cost of return shipping may be deducted from your refund if the return is for personal preference.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-black font-medium uppercase tracking-widest text-xs mb-4">6. Contact Us</h3>
                        <p>
                            To initiate a return or for any questions regarding our policy, please contact our support team via:
                            <br /><br />
                            <strong>Email:</strong> support@kiswastore.com<br />
                            <strong>WhatsApp:</strong> +966 50 123 4567
                        </p>
                    </section>

                    <p className="text-xs text-gray-400 pt-8 border-t border-gray-100">
                        Last Updated: January 14, 2026
                    </p>
                </div>
            </div>
        </div>
    );
}
