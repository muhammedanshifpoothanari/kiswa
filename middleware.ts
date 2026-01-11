import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const middleware = createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'ar'],

    // Used when no locale matches
    defaultLocale: 'en'
});

export default async function (request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Custom logic: if visiting root / or non-locale path, check Geo IF no cookie exists.
    if (!pathname.match(/^\/(en|ar)/) && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
        const hasCookie = request.cookies.has('NEXT_LOCALE');
        if (!hasCookie) {
            // Detect country
            const country = (request as any).geo?.country || 'US';
            const arabicCountries = ['SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'EG', 'JO', 'LB', 'IQ', 'YE', 'DZ', 'MA', 'TN', 'LY', 'SD', 'SY'];
            const targetLocale = arabicCountries.includes(country) ? 'ar' : 'en';

            // Manual redirect is safer for this specific requirement.
            const url = request.nextUrl.clone();
            url.pathname = `/${targetLocale}${pathname === '/' ? '' : pathname}`;
            return NextResponse.redirect(url);
        }
    }

    return middleware(request);
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: [
        '/((?!api|_next|_vercel|.*\\..*).*)',
        '/'
    ]
};
