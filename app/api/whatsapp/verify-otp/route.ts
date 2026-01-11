import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
    try {
        const { phone, code } = await request.json();

        if (!phone || !code) {
            return NextResponse.json({ error: 'Phone and code required' }, { status: 400 });
        }

        // Normalize phone
        let normalizedPhone = phone.replace(/\D/g, '');
        if (!normalizedPhone.startsWith('966') && normalizedPhone.length === 9) {
            normalizedPhone = '966' + normalizedPhone;
        }

        const result = verifyOTP(normalizedPhone, code);

        if (result.valid) {
            return NextResponse.json({
                success: true,
                phone: normalizedPhone,
                verifiedAt: new Date().toISOString(),
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
            });
        } else {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }
    } catch (error) {
        console.error('Verify OTP Error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
