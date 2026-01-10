export function DecorativeElements() {
    return (
        <>
            {/* Top Right Corner - Geometric Lines */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none hidden md:block">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="150" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="150" cy="50" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" />
                    <line x1="100" y1="20" x2="180" y2="80" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="120" y1="10" x2="190" y2="90" stroke="currentColor" strokeWidth="0.3" />
                </svg>
            </div>

            {/* Bottom Left Corner - Abstract Shapes */}
            <div className="absolute bottom-0 left-0 w-64 h-64 opacity-5 pointer-events-none hidden md:block">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    <rect x="20" y="140" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(15 45 165)" />
                    <circle cx="50" cy="150" r="30" fill="none" stroke="currentColor" strokeWidth="0.3" />
                    <line x1="10" y1="180" x2="90" y2="120" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            </div>

            {/* Dot Pattern Overlay - Keep this subtle texture */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />
        </>
    )
}
