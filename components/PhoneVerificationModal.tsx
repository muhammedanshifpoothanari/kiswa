'use client';

import { useState } from 'react';
import { X, Phone, MessageCircle, Loader2, CheckCircle } from 'lucide-react';

interface PhoneVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerified: (phone: string) => void;
}

export function PhoneVerificationModal({ isOpen, onClose, onVerified }: PhoneVerificationModalProps) {
    const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [devOtp, setDevOtp] = useState(''); // For development

    if (!isOpen) return null;

    async function handleSendOTP() {
        if (!phone || phone.length < 9) {
            setError('Please enter a valid phone number');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/whatsapp/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone })
            });

            const data = await res.json();

            if (res.ok) {
                setStep('otp');
                if (data.devOtp) setDevOtp(data.devOtp); // Dev mode
            } else {
                setError(data.error || 'Failed to send OTP');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    async function handleVerifyOTP() {
        if (!otp || otp.length !== 6) {
            setError('Please enter a 6-digit code');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/whatsapp/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, code: otp })
            });

            const data = await res.json();

            if (res.ok) {
                // Store in localStorage
                localStorage.setItem('kiswa_verified_phone', JSON.stringify({
                    phone: data.phone,
                    verifiedAt: data.verifiedAt,
                    expiresAt: data.expiresAt
                }));

                setStep('success');
                setTimeout(() => {
                    onVerified(data.phone);
                    onClose();
                }, 1500);
            } else {
                setError(data.error || 'Invalid OTP');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Verify via WhatsApp</h2>
                                <p className="text-sm text-green-100">Quick & secure verification</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {step === 'phone' && (
                        <div className="space-y-4">
                            <p className="text-gray-600 text-sm">
                                Enter your WhatsApp number to receive a verification code and unlock product details.
                            </p>

                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-500">
                                    <Phone className="w-4 h-4" />
                                    <span className="text-sm font-medium">+966</span>
                                </div>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                                    placeholder="5XXXXXXXX"
                                    className="w-full pl-24 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-lg"
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button
                                onClick={handleSendOTP}
                                disabled={loading}
                                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <MessageCircle className="w-5 h-5" />}
                                {loading ? 'Sending...' : 'Send OTP via WhatsApp'}
                            </button>

                            <p className="text-xs text-gray-400 text-center">
                                We'll send a one-time code to your WhatsApp. Standard messaging rates may apply.
                            </p>
                        </div>
                    )}

                    {step === 'otp' && (
                        <div className="space-y-4">
                            <p className="text-gray-600 text-sm">
                                Enter the 6-digit code sent to <span className="font-bold">+966 {phone}</span>
                            </p>

                            {devOtp && (
                                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                                    <p className="text-xs text-yellow-700">Dev Mode: OTP is <span className="font-bold">{devOtp}</span></p>
                                </div>
                            )}

                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="000000"
                                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-center text-2xl tracking-[0.5em] font-bold"
                                maxLength={6}
                            />

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button
                                onClick={handleVerifyOTP}
                                disabled={loading || otp.length !== 6}
                                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                                {loading ? 'Verifying...' : 'Verify Code'}
                            </button>

                            <button
                                onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
                                className="w-full py-2 text-gray-500 text-sm hover:text-gray-700"
                            >
                                ← Change phone number
                            </button>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-green-600 mb-2">Verified!</h3>
                            <p className="text-gray-600">You can now view product details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
