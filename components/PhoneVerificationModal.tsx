'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Phone, MessageSquare, Loader2, CheckCircle, Mail, Lock } from 'lucide-react';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { syncUser } from "@/app/actions/auth";

interface PhoneVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerified: (contact: string) => void;
}

export function PhoneVerificationModal({ isOpen, onClose, onVerified }: PhoneVerificationModalProps) {
    const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState("phone");

    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const recaptchaContainerRef = useRef<HTMLDivElement>(null);

    // Reset state when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setStep('phone');
            setPhone('');
            setOtp('');
            setError('');
            setLoading(false);
            setConfirmationResult(null);
            // Don't reset activeTab to let user stay on their preferred method
        }
    }, [isOpen]);

    if (!isOpen) return null;

    async function handleSendOTP() {
        if (!phone || phone.length < 9) {
            setError('Please enter a valid phone number');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Initialize reCAPTCHA
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-wrapper-modal', {
                    'size': 'invisible',
                    'callback': () => {
                        // reCAPTCHA solved
                    },
                    'expired-callback': () => {
                        setError('reCAPTCHA expired. Please try again.');
                        setLoading(false);
                    }
                });
            }

            const formattedPhone = `+966${phone}`;
            const appVerifier = window.recaptchaVerifier;

            const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
            setConfirmationResult(result);
            setStep('otp');

        } catch (err: any) {
            console.error('Error sending OTP:', err);
            setError(err.message || 'Failed to send SMS. Please try again.');
            // Reset reCAPTCHA if error occurs
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = undefined;
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleVerifyOTP() {
        if (!otp || otp.length !== 6) {
            setError('Please enter a 6-digit code');
            return;
        }

        if (!confirmationResult) {
            setError('Session expired. Please request a new code.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await confirmationResult.confirm(otp);
            const user = result.user;

            handleSuccess(user.phoneNumber || phone);
        } catch (err: any) {
            console.error('Error verifying OTP:', err);
            setError('Invalid code. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleAuth() {
        setLoading(true);
        setError('');
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            handleSuccess(result.user.email || 'Google User');
        } catch (err: any) {
            console.error('Google Auth Error:', err);
            setError(err.message || 'Google verification failed');
        } finally {
            setLoading(false);
        }
    }

    async function handleSuccess(contactInfo: string) {
        // Sync with MongoDB
        try {
            const user = auth.currentUser;
            if (user) {
                await syncUser({
                    uid: user.uid,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    displayName: user.displayName || 'Guest User'
                });
            }
        } catch (error) {
            console.error("Sync failed:", error);
        }

        // Store in localStorage
        localStorage.setItem('kiswa_verified_user', JSON.stringify({
            contact: contactInfo,
            method: activeTab,
            verifiedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        }));

        setStep('success');
        setTimeout(() => {
            onVerified(contactInfo);
            onClose();
        }, 1500);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
                {/* Header */}
                <div className="bg-white p-8 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                                {activeTab === 'phone' ? <MessageSquare className="w-5 h-5 text-black" /> : <Mail className="w-5 h-5 text-black" />}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold uppercase tracking-wide text-black">Verify Identity</h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
                                    {activeTab === 'phone' ? 'Secure verification via SMS' : 'Login using Google Account'}
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition text-gray-400 hover:text-black">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    {step === 'success' ? (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in spin-in duration-500">
                                <CheckCircle className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-wide text-black mb-3">Verified</h3>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Redirecting you now...</p>
                        </div>
                    ) : (
                        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setError(''); }}>
                            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-50 p-1 rounded-xl">
                                <TabsTrigger
                                    value="phone"
                                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-wider text-gray-400"
                                >
                                    Phone Number
                                </TabsTrigger>
                                <TabsTrigger
                                    value="email"
                                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-wider text-gray-400"
                                >
                                    Google Account
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="phone" className="space-y-6">
                                {step === 'phone' && (
                                    <div className="space-y-6">
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                            Please enter your phone number. We will send you a 6-digit verification code.
                                        </p>

                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-gray-400 border-r border-gray-200 pr-3">
                                                <Phone className="w-4 h-4" />
                                                <span className="text-sm font-bold tracking-wide text-black">+966</span>
                                            </div>
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                                                placeholder="5XXXXXXXX"
                                                className="w-full pl-32 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-all placeholder:text-gray-300 font-medium text-lg"
                                            />
                                        </div>

                                        <div id="recaptcha-wrapper-modal"></div>

                                        {error && (
                                            <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
                                                {error}
                                            </div>
                                        )}

                                        <button
                                            onClick={handleSendOTP}
                                            disabled={loading}
                                            className="w-full py-4 bg-black hover:bg-gray-900 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-black text-[11px] uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                        >
                                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
                                            {loading ? 'Sending...' : 'Send SMS Code'}
                                        </button>
                                    </div>
                                )}

                                {step === 'otp' && (
                                    <div className="space-y-6">
                                        <p className="text-gray-500 text-sm font-medium text-center">
                                            Enter the code sent to <span className="font-bold text-black">+966 {phone}</span>
                                        </p>

                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            placeholder="000000"
                                            className="w-full px-4 py-5 bg-gray-50/50 border border-gray-200 rounded-xl focus:border-black focus:ring-1 focus:ring-black focus:outline-none text-center text-3xl tracking-[0.5em] font-bold transition-all placeholder:text-gray-200"
                                            maxLength={6}
                                        />

                                        {error && (
                                            <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wide text-center">
                                                {error}
                                            </div>
                                        )}

                                        <button
                                            onClick={handleVerifyOTP}
                                            disabled={loading || otp.length !== 6}
                                            className="w-full py-4 bg-black hover:bg-gray-900 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-black text-[11px] uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                        >
                                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                            {loading ? 'Verifying...' : 'Verify Code'}
                                        </button>

                                        <button
                                            onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
                                            className="w-full py-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider hover:text-black transition-colors"
                                        >
                                            ← Change phone number
                                        </button>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="email" className="space-y-6">
                                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                    Sign in quickly using your Google account.
                                </p>

                                {error && (
                                    <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wide">
                                        {error}
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <button
                                        onClick={handleGoogleAuth}
                                        disabled={loading}
                                        className="w-full py-4 bg-white border border-gray-200 hover:bg-gray-50 hover:border-black text-black font-bold rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50 uppercase tracking-widest text-xs"
                                    >
                                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 4.63c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                        Continue with Google
                                    </button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    )}
                </div>
            </div>
        </div>
    );
}

declare global {
    interface Window {
        recaptchaVerifier: any;
    }
}
