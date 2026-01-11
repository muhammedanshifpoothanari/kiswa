// import { NextRequest, NextResponse } from 'next/server';
// import { saveEvent } from '@/lib/analytics-storage';
// import { UAParser } from 'ua-parser-js';

// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const userAgent = request.headers.get('user-agent') || '';
//         const parser = new UAParser(userAgent);
//         const result = parser.getResult();

//         // IP Detection
//         const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown';

//         // Geo Detection (Vercel specific, but good to have safety types)
//         const geo = (request as any).geo;

//         const eventData = {
//             eventType: body.eventType,
//             url: body.url,
//             timestamp: new Date(),
//             sessionId: body.sessionId,
//             userId: body.userId,
//             ip: ip,

//             // Detailed Device Info from User Agent
//             device: {
//                 type: result.device.type || 'desktop', // parser returns undefined for desktop usually
//                 vendor: result.device.vendor,
//                 model: result.device.model
//             },
//             os: {
//                 name: result.os.name,
//                 version: result.os.version
//             },
//             browser: {
//                 name: result.browser.name,
//                 version: result.browser.version,
//                 major: result.browser.major
//             },
//             engine: {
//                 name: result.engine.name,
//                 version: result.engine.version
//             },
//             cpu: {
//                 architecture: result.cpu.architecture
//             },

//             // Location
//             location: {
//                 country: geo?.country,
//                 region: geo?.region,
//                 city: geo?.city,
//                 latitude: geo?.latitude,
//                 longitude: geo?.longitude,
//                 timezone: geo?.timezone
//             },

//             metadata: body.metadata
//         };

//         await saveEvent(eventData);

//         return NextResponse.json({ success: true });
//     } catch (error) {
//         console.error("Analytics Tracking Error:", error);
//         return NextResponse.json({ success: false }, { status: 500 });
//     }
// }



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

        // 🔹 SNS Integration
        // This will asynchronously publish to your SNS topic
        sendVisitorNotification(visitorData).catch(console.error);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Notify visit error:', error);
        return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
    }
}
