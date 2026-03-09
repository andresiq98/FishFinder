import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS as C } from '../theme/colors';
import Logo from '../components/Logo';

export default function AuthScreen({ onLogin }) {
    const [offsetY, setOffsetY] = useState(0);
    const [isEntering, setIsEntering] = useState(false);

    const handleLogin = () => {
        setIsEntering(true);
        setTimeout(() => {
            onLogin();
        }, 1200); // Extended slightly for the fluid transition
    };

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lake breathing animation variants
    const orbVariants = {
        animate: {
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
            rotate: [0, 90, 0],
            transition: {
                duration: 12,
                ease: "easeInOut",
                repeat: Infinity,
            }
        }
    };

    const orbVariants2 = {
        animate: {
            scale: [1, 1.25, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, -90, 0],
            transition: {
                duration: 15,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 2
            }
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: C.nightRiver,
            color: "#FFF",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Ambient Lake Ripples / Breathing Orbs */}
            <motion.div
                variants={orbVariants}
                animate="animate"
                style={{
                    position: "absolute", top: "-20%", left: "-10%", width: "70vw", height: "70vw",
                    background: `radial-gradient(circle, ${C.riverLight} 0%, transparent 70%)`, filter: "blur(80px)", borderRadius: "50%"
                }}
            />
            <motion.div
                variants={orbVariants2}
                animate="animate"
                style={{
                    position: "absolute", bottom: "-10%", right: "-20%", width: "80vw", height: "80vw",
                    background: `radial-gradient(circle, ${C.mataTeal} 0%, transparent 70%)`, filter: "blur(100px)", borderRadius: "50%"
                }}
            />

            {/* Very subtle surface shimmer (moving overlay) */}
            <motion.div
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"]
                }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none", mixBlendMode: "overlay",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Immersive Fluid Entry Transition Overlay */}
            <AnimatePresence>
                {isEntering && (
                    <motion.div
                        initial={{ clipPath: `circle(0% at 50% 80%)`, opacity: 0 }}
                        animate={{ clipPath: `circle(150% at 50% 80%)`, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // smooth, fluid ease
                        style={{
                            position: 'fixed', inset: 0,
                            background: `linear-gradient(180deg, ${C.mataTeal}, ${C.riverDark})`,
                            zIndex: 999, pointerEvents: 'none',
                        }}
                    >
                        {/* Ripple echo inside the transition */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0.5 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            style={{
                                position: 'absolute', top: '50%', left: '50%', width: '100vw', height: '100vw',
                                transform: 'translate(-50%, -50%)', borderRadius: '50%', border: `2px solid ${C.riverLight}`
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <motion.div
                animate={{ opacity: isEntering ? 0 : 1, y: isEntering ? -20 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                    position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
                    minHeight: "100vh", justifyContent: "space-between", padding: "40px 24px"
                }}
            >
                {/* Top Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <Logo size={84} showText={true} /> {/* Slightly larger for prominence */}
                </motion.div>

                {/* Hero Text with Parallax Effect */}
                <div style={{
                    marginTop: "auto",
                    marginBottom: 40,
                    transform: `translateY(${offsetY * 0.3}px)`, // Parallax drift
                }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        style={{
                            fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "clamp(48px, 12vw, 72px)",
                            lineHeight: 1.1, letterSpacing: "-0.04em", margin: "0 0 16px 0"
                        }}
                    >
                        <span style={{ display: "block", color: C.white }}>Descubra</span>
                        <span style={{ display: "block", color: C.white }}>o próximo</span>
                        <span style={{
                            display: "block", background: `linear-gradient(135deg, ${C.amberGlow}, ${C.amber}, ${C.sunrise})`,
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        }}>
                            Troféu.
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
                        style={{
                            fontSize: 18, color: C.mist, fontFamily: "'DM Sans', sans-serif",
                            lineHeight: 1.6, maxWidth: 320, margin: 0
                        }}
                    >
                        Onde pescar, quando pescar, o que você pescou e se pode pescar.
                    </motion.p>
                </div>

                {/* Auth CTA Area */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    style={{
                        background: "rgba(19, 35, 56, 0.4)", // RiverDark with transparency
                        backdropFilter: "blur(20px)", borderRadius: 32, padding: 32,
                        border: `1px solid rgba(255,255,255,0.05)`, boxShadow: `0 24px 48px rgba(0,0,0,0.4)`
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
                        <Logo size={64} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <motion.button
                            onClick={handleLogin}
                            whileHover={{ scale: 1.02, boxShadow: `0 12px 32px ${C.amber}60` }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                background: `linear-gradient(135deg, ${C.amber}, ${C.sunrise})`,
                                color: "#000", border: "none", padding: "18px", borderRadius: 16,
                                fontSize: 16, fontWeight: 800, fontFamily: "'Outfit', sans-serif",
                                cursor: "pointer", boxShadow: `0 8px 24px ${C.amber}40`
                            }}
                        >
                            Começar a Pescar
                        </motion.button>
                        <motion.button
                            onClick={onLogin}
                            whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                background: "transparent", color: C.white,
                                border: `1px solid rgba(255,255,255,0.2)`, padding: "18px", borderRadius: 16,
                                fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", cursor: "pointer"
                            }}
                        >
                            Tenho um convite
                        </motion.button>
                    </div>
                    <div style={{ textAlign: "center", marginTop: 24 }}>
                        <span style={{ fontSize: 13, color: C.fog }}>
                            Ao continuar você aceita os <span style={{ color: C.amber, textDecoration: "underline", cursor: "pointer" }}>Termos de Uso</span>
                        </span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
