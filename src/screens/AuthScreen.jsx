import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS as C } from '../theme/colors';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING FISH PARTICLES
// ─────────────────────────────────────────────────────────────────────────────
function FloatingParticle({ delay, x, size, duration }) {
    return (
        <motion.div
            animate={{
                y: [0, -30, 0],
                x: [0, 8, -5, 0],
                opacity: [0, 0.4, 0.6, 0.3, 0],
            }}
            transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
            style={{
                position: 'absolute',
                bottom: '25%',
                left: `${x}%`,
                width: size,
                height: size * 0.5,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                background: `linear-gradient(135deg, ${C.amber}40, ${C.mataTeal}30)`,
                filter: 'blur(1px)',
                pointerEvents: 'none',
            }}
        />
    );
}

const PARTICLES = [
    { delay: 0, x: 12, size: 18, duration: 6 },
    { delay: 1.5, x: 28, size: 10, duration: 8 },
    { delay: 0.8, x: 55, size: 14, duration: 7 },
    { delay: 2.2, x: 72, size: 8, duration: 9 },
    { delay: 0.3, x: 88, size: 12, duration: 7.5 },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN AUTH SCREEN
// ─────────────────────────────────────────────────────────────────────────────
export default function AuthScreen() {
    const { bypassLogin } = useAuth();
    const [offsetY, setOffsetY] = useState(0);
    const [isEntering, setIsEntering] = useState(false);

    // Parallax on scroll
    useEffect(() => {
        const fn = () => setOffsetY(window.scrollY);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    const handleEnter = () => {
        setIsEntering(true);
        setTimeout(() => bypassLogin(), 700);
    };

    // Stagger helper
    const stagger = (i) => ({ duration: 0.9, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] });

    return (
        // NOTE: WaterBackground is rendered in App.jsx globally — don't add it here
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            overflow: 'hidden',
            fontFamily: "'Outfit', system-ui, sans-serif",
        }}>
            {/* Floating fish particles */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
                {PARTICLES.map((p, i) => <FloatingParticle key={i} {...p} />)}
            </div>

            {/* ── Ripple entry transition ── */}
            <AnimatePresence>
                {isEntering && (
                    <motion.div
                        initial={{ clipPath: 'circle(0% at 50% 82%)' }}
                        animate={{ clipPath: 'circle(160% at 50% 82%)' }}
                        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: 'fixed', inset: 0,
                            background: `linear-gradient(180deg, ${C.mataTeal}, ${C.riverDark} 70%, ${C.nightRiver})`,
                            zIndex: 999, pointerEvents: 'none',
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.4, opacity: 0.6 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            style={{
                                position: 'absolute', top: '82%', left: '50%',
                                width: '80vw', height: '80vw',
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '50%',
                                border: `2px solid ${C.riverLight}80`,
                            }}
                        />
                        <motion.div
                            initial={{ scale: 0.2, opacity: 0.4 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
                            style={{
                                position: 'absolute', top: '82%', left: '50%',
                                width: '80vw', height: '80vw',
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '50%',
                                border: `1px solid ${C.mataGlow}60`,
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Main content ── */}
            <motion.div
                animate={{ opacity: isEntering ? 0 : 1, y: isEntering ? -24 : 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{
                    position: 'relative', zIndex: 10,
                    display: 'flex', flexDirection: 'column',
                    minHeight: '100vh',
                    padding: '0 24px',
                    justifyContent: 'space-between',
                }}
            >
                {/* Top spacer */}
                <div />

                {/* Hero section */}
                <div style={{ transform: `translateY(${offsetY * 0.25}px)`, paddingBottom: 32 }}>
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={stagger(0)}
                        style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}
                    >
                        <div style={{
                            filter: `drop-shadow(0 0 24px ${C.amber}50) drop-shadow(0 0 8px ${C.amber}30)`,
                        }}>
                            <Logo size={80} showText={false} />
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={stagger(1)}
                        style={{ textAlign: 'center', marginBottom: 12 }}
                    >
                        <div style={{
                            fontSize: 'clamp(42px, 11vw, 68px)',
                            fontWeight: 900,
                            lineHeight: 1.08,
                            letterSpacing: '-0.04em',
                        }}>
                            <span style={{ display: 'block', color: C.white }}>Descubra</span>
                            <span style={{ display: 'block', color: C.white }}>o próximo</span>
                            <span style={{
                                display: 'block',
                                background: `linear-gradient(125deg, ${C.amberGlow}, ${C.amber} 55%, ${C.sunrise})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                Troféu.
                            </span>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={stagger(2)}
                        style={{
                            textAlign: 'center',
                            fontSize: 16, color: C.fog, lineHeight: 1.65,
                            margin: '0 auto', maxWidth: 300,
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        Onde pescar, quando pescar, o que você pescou e se pode pescar.
                    </motion.p>
                </div>

                {/* ── Liquid Glass CTA Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={stagger(3)}
                    style={{ paddingBottom: 40 }}
                >
                    <div style={{
                        borderRadius: 28,
                        padding: '28px 24px',
                        background: 'rgba(10, 22, 40, 0.42)',
                        backdropFilter: 'blur(28px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                        boxShadow: `
                            inset 0 1px 0 rgba(255,255,255,0.12),
                            inset 0 -1px 0 rgba(0,0,0,0.4),
                            inset 1px 0 0 rgba(255,255,255,0.06),
                            inset -1px 0 0 rgba(255,255,255,0.06),
                            0 24px 64px rgba(0,0,0,0.5),
                            0 0 0 1px rgba(255,255,255,0.06),
                            0 0 40px rgba(27,138,122,0.08)
                        `,
                    }}>
                        {/* Pulsing logo */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                            <motion.div
                                animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <Logo size={48} showText={false} />
                            </motion.div>
                        </div>

                        {/* Enter button */}
                        <motion.button
                            onClick={handleEnter}
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ boxShadow: `0 8px 28px ${C.amber}55` }}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                width: '100%', padding: '17px 0',
                                borderRadius: 16, border: 'none', cursor: 'pointer',
                                background: `linear-gradient(135deg, ${C.amberGlow} 0%, ${C.amber} 55%, ${C.sunrise} 100%)`,
                                color: '#0A0E17',
                                fontSize: 16, fontWeight: 800, letterSpacing: '0.01em',
                                fontFamily: "'Outfit', sans-serif",
                                boxShadow: `0 8px 28px ${C.amber}35`,
                            }}
                        >
                            <svg width="22" height="16" viewBox="0 0 48 28" fill="none">
                                <path d="M2 14 Q6 4 18 5 Q28 6 34 11 Q40 6 46 8 L40 14 L46 20 Q40 22 34 17 Q28 22 18 23 Q6 24 2 14Z" fill="#0A0E17" opacity="0.7" />
                                <circle cx="13" cy="13" r="2.5" fill="#0A0E17" />
                            </svg>
                            Começar a Pescar
                        </motion.button>

                        {/* Terms */}
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                            <span style={{
                                fontSize: 12, color: `${C.fog}80`,
                                fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5,
                            }}>
                                Ao continuar você aceita os{' '}
                                <span style={{
                                    color: `${C.amber}90`,
                                    textDecoration: 'underline',
                                    textDecorationColor: `${C.amber}40`,
                                    cursor: 'pointer',
                                }}>
                                    Termos de Uso
                                </span>
                            </span>
                        </div>
                    </div>
                </motion.div>

                <div style={{ height: 24 }} />
            </motion.div>
        </div>
    );
}
