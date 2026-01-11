"use client";

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAnalytics } from '@/hooks/use-analytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { trackEvent } = useAnalytics();
    const scrollDepthsTracked = useRef<Set<number>>(new Set());

    // Track Page Views
    useEffect(() => {
        // We track on mount and when pathname/searchParams change
        trackEvent('page_view');
        // Reset scroll tracking on page change
        scrollDepthsTracked.current = new Set();
    }, [pathname, searchParams, trackEvent]);

    // Track Scroll Depth
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            [25, 50, 75, 100].forEach(depth => {
                if (scrollPercent >= depth && !scrollDepthsTracked.current.has(depth)) {
                    scrollDepthsTracked.current.add(depth);
                    trackEvent('scroll_depth', { metadata: { depth } });
                }
            });
        };

        // Basic throttle implementation could be added here if needed, 
        // using requestAnimationFrame or setTimeout
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [trackEvent]);

    return <>{children}</>;
}
