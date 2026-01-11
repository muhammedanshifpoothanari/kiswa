// WhatsApp Business API Client for OTP
// Uses Meta Graph API

interface OTPStore {
    [phone: string]: {
        code: string;
        expiresAt: number;
        attempts: number;
    };
}

// In-memory OTP store (use Redis in production)
const otpStore: OTPStore = {};

export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOTP(phone: string, code: string): void {
    otpStore[phone] = {
        code,
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
        attempts: 0
    };
}

export function verifyOTP(phone: string, code: string): { valid: boolean; error?: string } {
    const stored = otpStore[phone];

    if (!stored) {
        return { valid: false, error: 'OTP not found. Please request a new one.' };
    }

    if (Date.now() > stored.expiresAt) {
        delete otpStore[phone];
        return { valid: false, error: 'OTP expired. Please request a new one.' };
    }

    stored.attempts++;

    if (stored.attempts > 3) {
        delete otpStore[phone];
        return { valid: false, error: 'Too many attempts. Please request a new OTP.' };
    }

    if (stored.code !== code) {
        return { valid: false, error: 'Invalid OTP. Please try again.' };
    }

    // Valid - clean up
    delete otpStore[phone];
    return { valid: true };
}

export async function sendWhatsAppOTP(phone: string, otp: string): Promise<boolean> {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const apiUrl = process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v18.0';

    if (!phoneNumberId || !accessToken) {
        console.warn('WhatsApp API not configured');
        // For development, just log and return true
        console.log(`[DEV] Would send OTP ${otp} to ${phone}`);
        return true;
    }

    try {
        const response = await fetch(`${apiUrl}/${phoneNumberId}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: phone.replace(/\D/g, ''), // Remove non-digits
                type: 'template',
                template: {
                    name: 'otp_verification', // Your approved template
                    language: { code: 'en' },
                    components: [
                        {
                            type: 'body',
                            parameters: [
                                { type: 'text', text: otp }
                            ]
                        },
                        {
                            type: 'button',
                            sub_type: 'url',
                            index: '0',
                            parameters: [
                                { type: 'text', text: otp }
                            ]
                        }
                    ]
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('WhatsApp API Error:', error);

            // Fallback to text message if template fails
            return await sendWhatsAppTextMessage(phone, otp);
        }

        return true;
    } catch (error) {
        console.error('WhatsApp send failed:', error);
        return false;
    }
}

async function sendWhatsAppTextMessage(phone: string, otp: string): Promise<boolean> {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const apiUrl = process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v18.0';

    if (!phoneNumberId || !accessToken) return false;

    try {
        const response = await fetch(`${apiUrl}/${phoneNumberId}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: phone.replace(/\D/g, ''),
                type: 'text',
                text: {
                    body: `Your KISWA verification code is: ${otp}\n\nThis code expires in 5 minutes.`
                }
            })
        });

        return response.ok;
    } catch (error) {
        console.error('WhatsApp text send failed:', error);
        return false;
    }
}
