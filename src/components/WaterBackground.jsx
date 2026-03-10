import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// WATER CANVAS — pixel-level shader (wave + ripple + caustic + golden peaks)
// ─────────────────────────────────────────────────────────────────────────────
function WaterCanvas({ width, height }) {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const timeRef = useRef(0);

    const draw = useCallback((ctx, w, h, t) => {
        const imageData = ctx.createImageData(w, h);
        const data = imageData.data;

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const idx = (y * w + x) * 4;
                const nx = x / w;
                const ny = y / h;

                // Multi-layer organic wave functions
                const wave1 = Math.sin(nx * 3.5 + t * 0.4 + Math.sin(ny * 2.1 + t * 0.3) * 1.2) * 0.5;
                const wave2 = Math.sin(ny * 4.2 - t * 0.25 + Math.cos(nx * 3.0 + t * 0.2) * 0.9) * 0.35;
                const wave3 = Math.sin((nx + ny) * 5.5 + t * 0.35) * 0.2;
                const wave4 = Math.sin(nx * 8.0 - t * 0.5 + ny * 3.0) * 0.08;
                const wave5 = Math.cos(ny * 6.0 + t * 0.15 + nx * 2.5) * 0.12;

                // Circular ripple from center-bottom
                const cx = 0.5, cy = 0.75;
                const dist = Math.sqrt((nx - cx) ** 2 + (ny - cy) ** 2);
                const ripple = Math.sin(dist * 18 - t * 0.8) * Math.exp(-dist * 2.5) * 0.3;

                const combined = wave1 + wave2 + wave3 + wave4 + wave5 + ripple;

                // Color: deep navy → teal → golden peaks
                let r = 8 + combined * 10;
                let g = 18 + combined * 24 + ny * 12;
                let b = 40 + combined * 38 + ny * 18;

                // Teal undertone
                const tealMix = Math.max(0, combined * 0.4 + 0.1);
                g += tealMix * 22;
                b += tealMix * 8;

                // Amber / golden highlights on wave peaks
                if (combined > 0.35) {
                    const highlight = (combined - 0.35) * 2.5;
                    r += highlight * 90;
                    g += highlight * 60;
                    b += highlight * 10;
                }

                // Caustic sparkles
                const caustic = Math.sin(nx * 12 + t * 0.6) * Math.sin(ny * 10 - t * 0.4);
                if (caustic > 0.7) {
                    const ci = (caustic - 0.7) * 3.3 * (1 - ny * 0.7);
                    r += ci * 28;
                    g += ci * 38;
                    b += ci * 50;
                }

                // Vignette (darken edges)
                const vg = 1 - Math.pow(dist * 0.85, 2) * 0.45;
                r *= vg; g *= vg; b *= vg;

                // Vertical fade — darker at top
                const vf = 0.55 + ny * 0.45;
                r *= vf; g *= vf; b *= vf;

                data[idx] = Math.max(0, Math.min(255, r));
                data[idx + 1] = Math.max(0, Math.min(255, g));
                data[idx + 2] = Math.max(0, Math.min(255, b));
                data[idx + 3] = 255;
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scale = 0.14;
        const w = Math.floor(width * scale);
        const h = Math.floor(height * scale);
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext('2d');

        const animate = () => {
            timeRef.current += 0.028;
            draw(ctx, w, h, timeRef.current);
            animRef.current = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animRef.current);
    }, [width, height, draw]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed', inset: 0,
                width: '100%', height: '100%',
                imageRendering: 'auto',
                filter: 'blur(1.5px)',
            }}
        />
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// WATER BACKGROUND — full composited layer (canvas + orbs + overlay)
// Drop this as the first child of any full-screen container.
// ─────────────────────────────────────────────────────────────────────────────
export default function WaterBackground({ opacity = 1 }) {
    // Use viewport dimensions for the fixed canvas
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    return (
        <div
            style={{
                position: 'fixed', inset: 0,
                zIndex: 0, pointerEvents: 'none',
                opacity,
            }}
        >
            {/* Pixel shader canvas */}
            <WaterCanvas width={vw} height={vh} />

            {/* Depth gradient overlay — keeps content readable over the canvas */}
            <div style={{
                position: 'fixed', inset: 0,
                background: `
                    radial-gradient(ellipse at 50% 90%, transparent 0%, #0A0E1788 55%),
                    linear-gradient(180deg,
                        #0A0E17E8 0%,
                        transparent 30%,
                        transparent 55%,
                        #0A0E17CC 82%,
                        #0A0E17 100%
                    )
                `,
            }} />

            {/* Ambient orb — teal (bottom-right) */}
            <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.1, 0.18, 0.1] }}
                transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity, delay: 0 }}
                style={{
                    position: 'fixed', bottom: '-10%', right: '-20%',
                    width: '70vw', height: '70vw',
                    background: 'radial-gradient(circle, #1B8A7A 0%, transparent 70%)',
                    filter: 'blur(90px)', borderRadius: '50%',
                }}
            />

            {/* Ambient orb — river-blue (top-left) */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
                transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
                style={{
                    position: 'fixed', top: '-15%', left: '-15%',
                    width: '65vw', height: '65vw',
                    background: 'radial-gradient(circle, #234770 0%, transparent 70%)',
                    filter: 'blur(80px)', borderRadius: '50%',
                }}
            />

            {/* Ambient orb — amber (mid-right) */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
                transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
                style={{
                    position: 'fixed', top: '30%', right: '-5%',
                    width: '45vw', height: '45vw',
                    background: 'radial-gradient(circle, #E8A02050 0%, transparent 70%)',
                    filter: 'blur(70px)', borderRadius: '50%',
                }}
            />

            {/* Horizontal shimmer line (light reflection) */}
            <div style={{
                position: 'fixed', top: '42%', left: '-15%', right: '-15%',
                height: 1,
                background: 'linear-gradient(90deg, transparent, #E8A02018, #FFD68510, transparent)',
                transform: 'rotate(-1.5deg)',
            }} />
        </div>
    );
}
