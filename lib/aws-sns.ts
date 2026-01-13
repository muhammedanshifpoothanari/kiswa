import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({
    region: process.env.AWS_REGION || 'me-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

interface VisitorData {
    // Session Info
    sessionId: string;
    timestamp: string;

    // Location & Device
    ip: string;
    country?: string;
    city?: string;
    region?: string;
    timezone?: string;

    // Device Info
    device: {
        type: string;
        vendor?: string;
        model?: string;
    };
    browser: {
        name: string;
        version: string;
        major?: string;
    };
    os: {
        name: string;
        version: string;
    };

    // Page Info
    currentPage: string;
    referrer?: string;

    // User Activity
    productsViewed: string[];
    cartItems: { name: string; price: number; quantity: number }[];
    cartTotal: number;

    // User Info (if available)
    phone?: string;
    email?: string;

    // Session Stats
    pagesVisited: number;
    sessionDuration: number; // in seconds

    // Event Type
    eventType: 'page_view' | 'product_view' | 'add_to_cart' | 'checkout_start' | 'checkout_abandon' | 'session_end';
}

export async function sendVisitorNotification(data: VisitorData): Promise<boolean> {
    const topicArn = process.env.AWS_SNS_TOPIC_ARN;

    if (!topicArn) {
        console.warn('AWS_SNS_TOPIC_ARN not configured');
        return false;
    }

    try {
        // Format message for easy reading
        const message = formatNotificationMessage(data);

        const command = new PublishCommand({
            TopicArn: topicArn,
            Subject: `🛒 Kiswa Visitor: ${data.eventType.replace('_', ' ').toUpperCase()} - ${data.country || 'Unknown Location'}`,
            Message: message,
            MessageAttributes: {
                eventType: {
                    DataType: 'String',
                    StringValue: data.eventType,
                },
                country: {
                    DataType: 'String',
                    StringValue: data.country || 'Unknown',
                },
                hasCart: {
                    DataType: 'String',
                    StringValue: data.cartItems.length > 0 ? 'true' : 'false',
                },
            },
        });

        await snsClient.send(command);
        console.log('SNS notification sent successfully');
        return true;
    } catch (error) {
        console.error('Failed to send SNS notification:', error);
        return false;
    }
}

function formatNotificationMessage(data: VisitorData): string {
    const lines = [
        '═══════════════════════════════════════',
        `🕐 TIME: ${new Date(data.timestamp).toLocaleString('en-US', { timeZone: 'Asia/Riyadh' })}`,
        `📍 EVENT: ${data.eventType.replace('_', ' ').toUpperCase()}`,
        '═══════════════════════════════════════',
        '',
        '📌 VISITOR INFORMATION',
        '───────────────────────────────────────',
        `   IP: ${data.ip}`,
        `   Location: ${data.city || 'N/A'}, ${data.region || ''} ${data.country || 'Unknown'}`,
        `   Timezone: ${data.timezone || 'N/A'}`,
        '',
        '📱 DEVICE & BROWSER',
        '───────────────────────────────────────',
        `   Device: ${data.device.type} ${data.device.vendor || ''} ${data.device.model || ''}`,
        `   Browser: ${data.browser.name} ${data.browser.version}`,
        `   OS: ${data.os.name} ${data.os.version}`,
        '',
        '🌐 PAGE ACTIVITY',
        '───────────────────────────────────────',
        `   Current Page: ${data.currentPage}`,
        `   Referrer: ${data.referrer || 'Direct'}`,
        `   Pages Visited: ${data.pagesVisited}`,
        `   Session Duration: ${Math.floor(data.sessionDuration / 60)}m ${data.sessionDuration % 60}s`,
    ];

    if (data.productsViewed.length > 0) {
        lines.push('');
        lines.push('👀 PRODUCTS VIEWED');
        lines.push('───────────────────────────────────────');
        data.productsViewed.slice(0, 5).forEach((p, i) => {
            lines.push(`   ${i + 1}. ${p}`);
        });
        if (data.productsViewed.length > 5) {
            lines.push(`   ... and ${data.productsViewed.length - 5} more`);
        }
    }

    if (data.cartItems.length > 0) {
        lines.push('');
        lines.push('🛒 CART CONTENTS');
        lines.push('───────────────────────────────────────');
        data.cartItems.forEach((item, i) => {
            lines.push(`   ${i + 1}. ${item.name} x${item.quantity} = ${item.price * item.quantity} SAR`);
        });
        lines.push('───────────────────────────────────────');
        lines.push(`   💰 CART TOTAL: ${data.cartTotal} SAR`);
    }

    if (data.phone || data.email) {
        lines.push('');
        lines.push('👤 CONTACT INFO');
        lines.push('───────────────────────────────────────');
        if (data.phone) lines.push(`   Phone: ${data.phone}`);
        if (data.email) lines.push(`   Email: ${data.email}`);
    }

    lines.push('');
    lines.push('═══════════════════════════════════════');
    lines.push(`Session ID: ${data.sessionId}`);
    lines.push('═══════════════════════════════════════');

    return lines.join('\n');
}

export type { VisitorData };
