import { useState, useEffect } from 'react';
import { COLORS as C } from '../theme/colors';
import Logo from '../components/Logo';

export default function AuthScreen({ onLogin }) {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div style={{
            minHeight: "100vh",
            background: C.nightRiver,
            color: "#FFF",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Decorative gradient orbs in background */}
            <div style={{
                position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%",
                background: `radial-gradient(circle, ${C.riverLight} 0%, transparent 70%)`, opacity: 0.15, filter: "blur(60px)"
            }} />
            <div style={{
                position: "absolute", bottom: "10%", right: "-20%", width: "60%", height: "60%",
                background: `radial-gradient(circle, ${C.mataTeal} 0%, transparent 70%)`, opacity: 0.1, filter: "blur(80px)"
            }} />

            {/* Main Content Area */}
            <div style={{
                position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
                minHeight: "100vh", justifyContent: "space-between", padding: "40px 24px"
            }}>

                {/* Top Logo */}
                <div style={{ animation: "fadeUp 0.8s ease-out" }}>
                    <Logo size={40} showText={false} />
                </div>

                {/* Hero Text with Parallax Effect */}
                <div style={{
                    marginTop: "auto",
                    marginBottom: 40,
                    transform: `translateY(${offsetY * 0.3}px)`, // Parallax drift
                    animation: "fadeUp 1s ease-out 0.2s both"
                }}>
                    <h1 style={{
                        fontFamily: "'Outfit', sans-serif", fontWeight: 900,
                        fontSize: "clamp(48px, 12vw, 72px)", lineHeight: 1.1,
                        letterSpacing: "-0.04em", margin: "0 0 16px 0"
                    }}>
                        <span style={{ display: "block", color: C.white }}>Descubra</span>
                        <span style={{ display: "block", color: C.white }}>o próximo</span>
                        <span style={{
                            display: "block",
                            background: `linear-gradient(135deg, ${C.amberGlow}, ${C.amber}, ${C.sunrise})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                            Troféu.
                        </span>
                    </h1>
                    <p style={{
                        fontSize: 18, color: C.mist, fontFamily: "'DM Sans', sans-serif",
                        lineHeight: 1.6, maxWidth: 320, margin: 0
                    }}>
                        Onde pescar, quando pescar, o que você pescou e se pode pescar.
                    </p>
                </div>

                {/* Auth CTA Area */}
                <div style={{
                    background: "rgba(19, 35, 56, 0.4)", // RiverDark with transparency
                    backdropFilter: "blur(16px)",
                    borderRadius: 24,
                    padding: 32,
                    border: `1px solid rgba(255,255,255,0.05)`,
                    boxShadow: `0 24px 48px rgba(0,0,0,0.4)`,
                    animation: "fadeUp 1s ease-out 0.4s both"
                }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
                        <Logo size={56} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <button onClick={onLogin} style={{
                            background: `linear-gradient(135deg, ${C.amber}, ${C.sunrise})`,
                            color: "#000", border: "none", padding: "18px", borderRadius: 16,
                            fontSize: 16, fontWeight: 800, fontFamily: "'Outfit', sans-serif",
                            cursor: "pointer", boxShadow: `0 8px 24px ${C.amber}40`,
                            transition: "transform 0.2s"
                        }}
                            onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
                            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                        >
                            Começar a Pescar
                        </button>
                        <button onClick={onLogin} style={{
                            background: "transparent", color: C.white,
                            border: `1px solid rgba(255,255,255,0.2)`, padding: "18px", borderRadius: 16,
                            fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
                            cursor: "pointer", transition: "background 0.2s"
                        }}
                            onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                            onMouseOut={e => e.currentTarget.style.background = "transparent"}
                        >
                            Tenho um convite
                        </button>
                    </div>
                    <div style={{ textAlign: "center", marginTop: 24 }}>
                        <span style={{ fontSize: 13, color: C.fog }}>
                            Ao continuar você aceita os <span style={{ color: C.amber, textDecoration: "underline", cursor: "pointer" }}>Termos de Uso</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
