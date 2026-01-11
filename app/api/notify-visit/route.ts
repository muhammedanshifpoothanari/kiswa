import { NextRequest, NextResponse } from 'next/server';
import { sendVisitorNotification, VisitorData } from '@/lib/aws-sns';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Get IP from headers
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

        const visitorData: VisitorData = {
            sessionId: body.sessionId || 'unknown',
            timestamp: new Date().toISOString(),
            ip,
            country: body.location?.country,
            city: body.location?.city,
            region: body.location?.region,
            timezone: body.location?.timezone,
            device: body.device || { type: 'unknown' },
            browser: body.browser || { name: 'unknown', version: '' },
            os: body.os || { name: 'unknown', version: '' },
            currentPage: body.currentPage || '/',
            referrer: body.referrer,
            productsViewed: body.productsViewed || [],
            cartItems: body.cartItems || [],
            cartTotal: body.cartTotal || 0,
            phone: body.phone,
            email: body.email,
            pagesVisited: body.pagesVisited || 1,
            sessionDuration: body.sessionDuration || 0,
            eventType: body.eventType || 'page_view',
        };

        // Send notification (don't await to avoid blocking response)
        sendVisitorNotification(visitorData).catch(console.error);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Notify visit error:', error);
        return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
    }
}
