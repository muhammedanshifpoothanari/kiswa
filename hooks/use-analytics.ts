"use client";

import { useCallback, useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usePathname } from 'next/navigation';

export interface AnalyticsEventPayload {
    eventType: 'page_view' | 'product_view' | 'add_to_cart' | 'checkout_start' | 'scroll_depth' | 'session_start' | 'checkout_abandon' | 'session_end';
    metadata?: any;
}

interface SessionData {
    pagesVisited: number;
    productsViewed: string[];
    startTime: number;
}

export function useAnalytics() {
    const [sessionId, setSessionId] = useState<string>('');
    const pathname = usePathname();
    const sessionDataRef = useRef<SessionData>({ pagesVisited: 0, productsViewed: [], startTime: Date.now() });

    useEffect(() => {
        // Initialize Session
        let sid = localStorage.getItem('kiswa_session_id');
        let sessionData = localStorage.getItem('kiswa_session_data');

        if (!sid) {
            sid = uuidv4();
            localStorage.setItem('kiswa_session_id', sid);
            sessionDataRef.current = { pagesVisited: 0, productsViewed: [], startTime: Date.now() };
            localStorage.setItem('kiswa_session_data', JSON.stringify(sessionDataRef.current));

            // Track session start
            trackEventInternal(sid, 'session_start', { referrer: document.referrer });
        } else if (sessionData) {
            sessionDataRef.current = JSON.parse(sessionData);
        }

        setSessionId(sid);

        // Send visitor notification on page load
        notifyVisit(sid, 'page_view');
    }, []);

    // Track page changes
    useEffect(() => {
        if (sessionId && pathname) {
            sessionDataRef.current.pagesVisited++;
            localStorage.setItem('kiswa_session_data', JSON.stringify(sessionDataRef.current));
            notifyVisit(sessionId, 'page_view');
        }
    }, [pathname, sessionId]);

    const getDeviceInfo = () => {
        const ua = navigator.userAgent;
        let deviceType: 'mobile' | 'desktop' | 'tablet' = 'desktop';

        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            deviceType = 'tablet';
        } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            deviceType = 'mobile';
        }

        // Parse browser
        let browserName = 'Unknown', browserVersion = '';
        if (ua.includes('Chrome')) {
            browserName = 'Chrome';
            browserVersion = ua.match(/Chrome\/(\d+)/)?.[1] || '';
        } else if (ua.includes('Firefox')) {
            browserName = 'Firefox';
            browserVersion = ua.match(/Firefox\/(\d+)/)?.[1] || '';
        } else if (ua.includes('Safari')) {
            browserName = 'Safari';
            browserVersion = ua.match(/Version\/(\d+)/)?.[1] || '';
        } else if (ua.includes('Edge')) {
            browserName = 'Edge';
            browserVersion = ua.match(/Edge\/(\d+)/)?.[1] || '';
        }

        // Parse OS
        let osName = 'Unknown', osVersion = '';
        if (ua.includes('Windows')) {
            osName = 'Windows';
            osVersion = ua.match(/Windows NT (\d+\.\d+)/)?.[1] || '';
        } else if (ua.includes('Mac OS')) {
            osName = 'macOS';
            osVersion = ua.match(/Mac OS X (\d+[._]\d+)/)?.[1]?.replace('_', '.') || '';
        } else if (ua.includes('Android')) {
            osName = 'Android';
            osVersion = ua.match(/Android (\d+)/)?.[1] || '';
        } else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
            osName = 'iOS';
            osVersion = ua.match(/OS (\d+)/)?.[1] || '';
        }

        return {
            device: { type: deviceType, vendor: '', model: '' },
            browser: { name: browserName, version: browserVersion },
            os: { name: osName, version: osVersion }
        };
    };

    const getCartData = () => {
        try {
            const cart = localStorage.getItem('cart');
            if (cart) {
                const items = JSON.parse(cart);
                return {
                    cartItems: items.map((item: any) => ({
                        name: item.name || item.title,
                        price: item.price,
                        quantity: item.quantity || 1
                    })),
                    cartTotal: items.reduce((sum: number, item: any) => sum + (item.price * (item.quantity || 1)), 0)
                };
            }
        } catch (e) { }
        return { cartItems: [], cartTotal: 0 };
    };

    const notifyVisit = async (sid: string, eventType: string) => {
        try {
            const deviceInfo = getDeviceInfo();
            const cartData = getCartData();
            const verifiedPhone = localStorage.getItem('kiswa_verified_phone');
            let phone = '';
            if (verifiedPhone) {
                try { phone = JSON.parse(verifiedPhone).phone; } catch (e) { }
            }

            await fetch('/api/notify-visit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: sid,
                    eventType,
                    currentPage: window.location.href,
                    referrer: document.referrer,
                    ...deviceInfo,
                    ...cartData,
                    productsViewed: sessionDataRef.current.productsViewed,
                    pagesVisited: sessionDataRef.current.pagesVisited,
                    sessionDuration: Math.floor((Date.now() - sessionDataRef.current.startTime) / 1000),
                    phone
                })
            });
        } catch (error) {
            console.error('Failed to notify visit:', error);
        }
    };

    const trackEventInternal = async (sid: string, eventType: string, metadata: any = {}) => {
        try {
            await fetch('/api/analytics/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventType,
                    url: window.location.href,
                    sessionId: sid,
                    device: getDeviceInfo().device,
                    metadata
                }),
            });
        } catch (error) {
            console.error('Failed to track event:', eventType, error);
        }
    };

    const trackEvent = useCallback((eventType: AnalyticsEventPayload['eventType'], metadata?: any) => {
        const sid = localStorage.getItem('kiswa_session_id') || sessionId;

        if (sid) {
            trackEventInternal(sid, eventType, metadata);

            // Also send SNS notification for important events
            if (['product_view', 'add_to_cart', 'checkout_start', 'checkout_abandon'].includes(eventType)) {
                notifyVisit(sid, eventType);
            }

            // Track product views
            if (eventType === 'product_view' && metadata?.productName) {
                if (!sessionDataRef.current.productsViewed.includes(metadata.productName)) {
                    sessionDataRef.current.productsViewed.push(metadata.productName);
                    localStorage.setItem('kiswa_session_data', JSON.stringify(sessionDataRef.current));
                }
            }
        }
    }, [sessionId]);

    return { trackEvent, sessionId, notifyVisit };
}
