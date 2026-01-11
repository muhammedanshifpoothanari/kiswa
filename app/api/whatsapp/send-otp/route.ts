import { NextRequest, NextResponse } from 'next/server';
import { generateOTP, storeOTP, sendWhatsAppOTP } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
    try {
        const { phone } = await request.json();

        if (!phone) {
            return NextResponse.json({ error: 'Phone number required' }, { status: 400 });
        }

        // Normalize phone number
        let normalizedPhone = phone.replace(/\D/g, '');
        if (!normalizedPhone.startsWith('966') && normalizedPhone.length === 9) {
            normalizedPhone = '966' + normalizedPhone;
        }

        // Generate and store OTP
        const otp = generateOTP();
        storeOTP(normalizedPhone, otp);

        // Send via WhatsApp
        const sent = await sendWhatsAppOTP(normalizedPhone, otp);

        if (sent) {
            return NextResponse.json({
                success: true,
                message: 'OTP sent to WhatsApp',
                // For development, include OTP (remove in production!)
                ...(process.env.NODE_ENV === 'development' && { devOtp: otp })
            });
        } else {
            return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
        }
    } catch (error) {
        console.error('Send OTP Error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
