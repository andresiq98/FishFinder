import { COLORS as C } from '../theme/colors';

export default function Logo({ size = 48, showText = true }) {
    const scale = size / 48;
    return (
        <div style={{ display: "flex", alignItems: "center", gap: showText ? 12 * scale : 0 }}>
            {/* Container to enforce exact SVG size scaling without clipping */}
            <div style={{ width: size, height: size, flexShrink: 0 }}>
                <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none">
                    <defs>
                        <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48">
                            <stop offset="0%" stopColor={C.amberGlow} />
                            <stop offset="50%" stopColor={C.amber} />
                            <stop offset="100%" stopColor={C.sunrise} />
                        </linearGradient>
                        <linearGradient id="waterGrad" x1="0" y1="24" x2="48" y2="48">
                            <stop offset="0%" stopColor={C.mataTeal} />
                            <stop offset="100%" stopColor={C.riverLight} />
                        </linearGradient>
                        <clipPath id="circClip">
                            <circle cx="24" cy="24" r="22" />
                        </clipPath>
                    </defs>
                    {/* Background circle */}
                    <circle cx="24" cy="24" r="23" fill={C.deepWater} stroke="url(#logoGrad)" strokeWidth="1.5" />

                    {/* Water waves at bottom */}
                    <g clipPath="url(#circClip)">
                        <path d="M0 32 Q8 29 16 32 Q24 35 32 32 Q40 29 48 32 L48 48 L0 48Z" fill={C.riverMid} opacity="0.5" />
                        <path d="M0 35 Q8 32 16 35 Q24 38 32 35 Q40 32 48 35 L48 48 L0 48Z" fill={C.riverMid} opacity="0.3" />
                    </g>

                    {/* Stylized fish — flowing, dynamic silhouette */}
                    <g transform="translate(7, 14)">
                        {/* Fish body — elegant curve */}
                        <path
                            d="M2 10 Q6 3 14 4 Q20 5 24 8 Q28 5 32 6 L28 10 L32 14 Q28 15 24 12 Q20 15 14 16 Q6 17 2 10Z"
                            fill="url(#logoGrad)"
                        />
                        {/* Eye */}
                        <circle cx="10" cy="10" r="1.8" fill={C.deepWater} />
                        <circle cx="10.4" cy="9.6" r="0.6" fill={C.amberGlow} />
                        {/* Fin detail */}
                        <path d="M16 7 Q18 2 20 7" stroke={C.deepWater} strokeWidth="0.8" fill="none" opacity="0.4" />
                    </g>

                    {/* Sonar/location ping rings */}
                    <circle cx="34" cy="14" r="3" fill="none" stroke={C.amber} strokeWidth="0.8" opacity="0.6" />
                    <circle cx="34" cy="14" r="6" fill="none" stroke={C.amber} strokeWidth="0.5" opacity="0.3" />
                    <circle cx="34" cy="14" r="1.2" fill={C.amber} />
                </svg>
            </div>

            {showText && (
                <div style={{ display: "flex", flexDirection: "column", gap: 0, justifyContent: "center" }}>
                    <span style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: size * 0.52,
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                        background: `linear-gradient(135deg, ${C.amberGlow}, ${C.amber}, ${C.sunrise})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "block"
                    }}>
                        FishFinder
                    </span>
                    <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: size * 0.16,
                        fontWeight: 600,
                        color: C.amber,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        opacity: 0.8,
                        marginTop: Math.max(2, size * 0.05),
                        display: "block"
                    }}>
                        Pro Edition
                    </span>
                </div>
            )}
        </div>
    );
}
