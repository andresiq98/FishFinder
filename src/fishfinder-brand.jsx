import { useState, useEffect, useRef } from "react";

// ── FishFinder Brand Identity System ──────────────────────────────────
// "Onde pescar, quando pescar, o que você pescou e se pode pescar."

const COLORS = {
  // Core palette
  nightRiver: "#0A0E17",
  deepWater: "#0F1A2E",
  riverDark: "#132338",
  riverMid: "#1A3150",
  riverLight: "#234770",

  // Accent — Golden Hour
  amber: "#E8A020",
  amberLight: "#F2BE5C",
  amberGlow: "#FFD685",
  sunrise: "#F07A2F",

  // Nature
  mataTeal: "#1B8A7A",
  mataLight: "#2DB89E",
  mataGlow: "#4FD4BA",

  // Earth
  terra: "#8B5E3C",
  terraLight: "#B5845A",

  // Neutrals
  mist: "#C8D6E0",
  fog: "#8A9BB0",
  cloud: "#E8EEF2",
  white: "#F5F7FA",

  // Semantic
  verde: "#22C55E",
  amarelo: "#EAB308",
  vermelho: "#EF4444",
};

// ── SVG Logo Component ──
function FishFinderLogo({ size = 48, showText = true, variant = "full" }) {
  const scale = size / 48;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: showText ? 12 : 0 }}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor={COLORS.amberGlow} />
            <stop offset="50%" stopColor={COLORS.amber} />
            <stop offset="100%" stopColor={COLORS.sunrise} />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0" y1="24" x2="48" y2="48">
            <stop offset="0%" stopColor={COLORS.mataTeal} />
            <stop offset="100%" stopColor={COLORS.riverLight} />
          </linearGradient>
          <clipPath id="circClip">
            <circle cx="24" cy="24" r="22" />
          </clipPath>
        </defs>
        {/* Background circle */}
        <circle cx="24" cy="24" r="23" fill={COLORS.deepWater} stroke="url(#logoGrad)" strokeWidth="1.5" />

        {/* Water waves at bottom */}
        <g clipPath="url(#circClip)">
          <path d="M0 32 Q8 29 16 32 Q24 35 32 32 Q40 29 48 32 L48 48 L0 48Z" fill={COLORS.riverMid} opacity="0.5" />
          <path d="M0 35 Q8 32 16 35 Q24 38 32 35 Q40 32 48 35 L48 48 L0 48Z" fill={COLORS.riverMid} opacity="0.3" />
        </g>

        {/* Stylized fish — flowing, dynamic silhouette */}
        <g transform="translate(7, 14)">
          {/* Fish body — elegant curve */}
          <path
            d="M2 10 Q6 3 14 4 Q20 5 24 8 Q28 5 32 6 L28 10 L32 14 Q28 15 24 12 Q20 15 14 16 Q6 17 2 10Z"
            fill="url(#logoGrad)"
          />
          {/* Eye */}
          <circle cx="10" cy="10" r="1.8" fill={COLORS.deepWater} />
          <circle cx="10.4" cy="9.6" r="0.6" fill={COLORS.amberGlow} />
          {/* Fin detail */}
          <path d="M16 7 Q18 2 20 7" stroke={COLORS.deepWater} strokeWidth="0.8" fill="none" opacity="0.4" />
        </g>

        {/* Sonar/location ping rings */}
        <circle cx="34" cy="14" r="3" fill="none" stroke={COLORS.amber} strokeWidth="0.8" opacity="0.6" />
        <circle cx="34" cy="14" r="6" fill="none" stroke={COLORS.amber} strokeWidth="0.5" opacity="0.3" />
        <circle cx="34" cy="14" r="1.2" fill={COLORS.amber} />
      </svg>

      {showText && (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: size * 0.52,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            background: `linear-gradient(135deg, ${COLORS.amberGlow}, ${COLORS.amber}, ${COLORS.sunrise})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Fish<span style={{
              background: `linear-gradient(135deg, ${COLORS.cloud}, ${COLORS.mist})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Finder</span>
          </span>
          {variant === "full" && (
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: size * 0.17,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: COLORS.fog,
              marginTop: -1,
            }}>
              Pesca esportiva brasileira
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ── Animated Water Background ──
function WaterBg() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", bottom: 0 }}>
        <defs>
          <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.mataTeal} stopOpacity="0.06" />
            <stop offset="100%" stopColor={COLORS.riverLight} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path fill="url(#waveFill)">
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="M0 80 Q200 60 400 80 Q600 100 800 80 Q1000 60 1200 80 L1200 200 L0 200Z;M0 80 Q200 100 400 80 Q600 60 800 80 Q1000 100 1200 80 L1200 200 L0 200Z;M0 80 Q200 60 400 80 Q600 100 800 80 Q1000 60 1200 80 L1200 200 L0 200Z"
          />
        </path>
      </svg>
    </div>
  );
}

// ── Color Swatch ──
function Swatch({ name, hex, isLight = false, subtitle }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      onClick={() => { navigator.clipboard?.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
      style={{
        cursor: "pointer",
        borderRadius: 14,
        overflow: "hidden",
        border: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
        transition: "transform 0.2s, box-shadow 0.2s",
        flex: "1 1 120px",
        minWidth: 110,
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${hex}33`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ background: hex, height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {copied && <span style={{ fontSize: 11, fontWeight: 700, color: isLight ? "#000" : "#fff", opacity: 0.9 }}>Copiado!</span>}
      </div>
      <div style={{ padding: "10px 12px", background: COLORS.riverDark }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.cloud, lineHeight: 1.2 }}>{name}</div>
        <div style={{ fontSize: 11, color: COLORS.fog, fontFamily: "monospace", marginTop: 2 }}>{hex}</div>
        {subtitle && <div style={{ fontSize: 10, color: COLORS.fog, marginTop: 2, opacity: 0.7 }}>{subtitle}</div>}
      </div>
    </div>
  );
}

// ── Section Header ──
function SectionTitle({ number, title, subtitle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 13,
          fontWeight: 800,
          color: COLORS.amber,
          letterSpacing: "0.08em",
        }}>{number}</span>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 28,
          fontWeight: 800,
          color: COLORS.white,
          margin: 0,
          letterSpacing: "-0.02em",
        }}>{title}</h2>
      </div>
      {subtitle && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15,
          color: COLORS.fog,
          margin: 0,
          maxWidth: 600,
          lineHeight: 1.6,
          paddingLeft: 36,
        }}>{subtitle}</p>
      )}
      <div style={{
        width: 40,
        height: 3,
        borderRadius: 2,
        background: `linear-gradient(90deg, ${COLORS.amber}, transparent)`,
        marginTop: 12,
        marginLeft: 36,
      }} />
    </div>
  );
}

// ── Phone Mockup ──
function PhoneMockup({ children, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{
        width: 260,
        height: 520,
        borderRadius: 32,
        border: `2px solid ${COLORS.riverLight}`,
        background: COLORS.nightRiver,
        overflow: "hidden",
        position: "relative",
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 ${COLORS.riverMid}`,
      }}>
        {/* Notch */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 100, height: 24, borderRadius: "0 0 16px 16px",
          background: "#000", zIndex: 10,
        }} />
        {/* Screen content */}
        <div style={{ padding: 0, height: "100%", overflow: "hidden" }}>
          {children}
        </div>
      </div>
      {label && <span style={{ fontSize: 12, color: COLORS.fog, fontWeight: 600, letterSpacing: "0.05em" }}>{label}</span>}
    </div>
  );
}

// ── Bottom Nav Mockup ──
function BottomNav({ active = 0 }) {
  const items = [
    { icon: "⌂", label: "Início" },
    { icon: "◎", label: "Capturar" },
    { icon: "◈", label: "Mapa" },
    { icon: "❋", label: "Espécies" },
    { icon: "◉", label: "Perfil" },
  ];
  return (
    <div style={{
      display: "flex", justifyContent: "space-around", alignItems: "center",
      padding: "8px 0 16px", background: COLORS.deepWater,
      borderTop: `1px solid ${COLORS.riverMid}`,
    }}>
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
          opacity: i === active ? 1 : 0.45,
          transition: "opacity 0.2s",
        }}>
          <span style={{
            fontSize: 18,
            color: i === active ? COLORS.amber : COLORS.mist,
            filter: i === active ? `drop-shadow(0 0 6px ${COLORS.amber}55)` : "none",
          }}>{item.icon}</span>
          <span style={{
            fontSize: 9,
            fontWeight: i === active ? 700 : 500,
            color: i === active ? COLORS.amber : COLORS.fog,
            letterSpacing: "0.02em",
          }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Home Screen Mockup ──
function HomeScreen() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, padding: "36px 18px 8px", overflow: "hidden" }}>
        {/* Status bar area */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <FishFinderLogo size={22} variant="compact" showText={true} />
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.riverMid}, ${COLORS.riverLight})`,
            border: `1.5px solid ${COLORS.amber}44`,
          }} />
        </div>

        {/* Green status card */}
        <div style={{
          borderRadius: 16,
          padding: "16px 18px",
          background: `linear-gradient(135deg, ${COLORS.mataTeal}22, ${COLORS.riverDark})`,
          border: `1px solid ${COLORS.mataTeal}44`,
          marginBottom: 14,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: `${COLORS.verde}22`, display: "flex", alignItems: "center", justifyContent: "center",
              border: `2px solid ${COLORS.verde}`,
              boxShadow: `0 0 16px ${COLORS.verde}33`,
            }}>
              <span style={{ fontSize: 16 }}>✓</span>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.verde, letterSpacing: "-0.01em" }}>
                PESCA LIBERADA
              </div>
              <div style={{ fontSize: 10, color: COLORS.fog }}>
                Represa de Guarapiranga, SP
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Tucunaré", "Tilápia", "Traíra"].map(f => (
              <span key={f} style={{
                fontSize: 9, padding: "3px 8px", borderRadius: 20,
                background: `${COLORS.mataTeal}33`, color: COLORS.mataGlow,
                fontWeight: 600,
              }}>{f}</span>
            ))}
          </div>
        </div>

        {/* Solunar card */}
        <div style={{
          borderRadius: 16, padding: "14px 18px",
          background: COLORS.riverDark,
          border: `1px solid ${COLORS.riverMid}`,
          marginBottom: 14,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: COLORS.fog, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Índice de Pesca Hoje
            </span>
            <span style={{
              fontSize: 22, fontWeight: 900, color: COLORS.amber,
              fontFamily: "'Outfit', sans-serif",
              textShadow: `0 0 20px ${COLORS.amber}44`,
            }}>78</span>
          </div>
          {/* Mini bar chart */}
          <div style={{ display: "flex", gap: 3, alignItems: "end", height: 40 }}>
            {[30, 45, 65, 78, 92, 85, 70, 55, 42, 38, 50, 68, 80, 72, 58, 40, 32, 28, 35, 48, 62, 75, 70, 55].map((v, i) => (
              <div key={i} style={{
                flex: 1, height: `${v * 0.4}px`, borderRadius: 2,
                background: v > 70 ? `linear-gradient(to top, ${COLORS.amber}, ${COLORS.amberGlow})` :
                  v > 50 ? COLORS.riverLight : COLORS.riverMid,
                opacity: i === 3 ? 1 : 0.7,
              }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontSize: 8, color: COLORS.fog }}>00h</span>
            <span style={{ fontSize: 8, color: COLORS.amber, fontWeight: 700 }}>→ agora</span>
            <span style={{ fontSize: 8, color: COLORS.fog }}>23h</span>
          </div>
        </div>

        {/* Weather strip */}
        <div style={{
          display: "flex", gap: 8, marginBottom: 14,
        }}>
          {[
            { label: "26°C", sub: "Temp" },
            { label: "1013hPa", sub: "Pressão" },
            { label: "12 km/h", sub: "Vento" },
            { label: "🌗", sub: "Minguante" },
          ].map((w, i) => (
            <div key={i} style={{
              flex: 1, borderRadius: 12, padding: "8px 6px",
              background: COLORS.riverDark, border: `1px solid ${COLORS.riverMid}`,
              textAlign: "center",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.cloud }}>{w.label}</div>
              <div style={{ fontSize: 8, color: COLORS.fog, marginTop: 2 }}>{w.sub}</div>
            </div>
          ))}
        </div>

        {/* Last catch */}
        <div style={{
          borderRadius: 16, padding: "12px 14px",
          background: COLORS.riverDark, border: `1px solid ${COLORS.riverMid}`,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: `linear-gradient(135deg, ${COLORS.riverMid}, ${COLORS.riverLight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24,
          }}>🐟</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.cloud }}>Última captura</div>
            <div style={{ fontSize: 10, color: COLORS.amber, fontWeight: 600 }}>Tucunaré Azul — 3.2 kg</div>
            <div style={{ fontSize: 9, color: COLORS.fog }}>Há 3 dias · Rio Tietê</div>
          </div>
          <span style={{ fontSize: 16, color: COLORS.fog }}>›</span>
        </div>
      </div>
      <BottomNav active={0} />
    </div>
  );
}

// ── Capture Screen Mockup ──
function CaptureScreen() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, position: "relative", background: "#111" }}>
        {/* Camera viewfinder */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at center, #1a2a1a 0%, #0a0f0a 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Scanning frame */}
          <div style={{
            width: 180, height: 180, position: "relative",
          }}>
            {/* Corner markers */}
            {[
              { top: 0, left: 0, borderTop: `3px solid ${COLORS.amber}`, borderLeft: `3px solid ${COLORS.amber}` },
              { top: 0, right: 0, borderTop: `3px solid ${COLORS.amber}`, borderRight: `3px solid ${COLORS.amber}` },
              { bottom: 0, left: 0, borderBottom: `3px solid ${COLORS.amber}`, borderLeft: `3px solid ${COLORS.amber}` },
              { bottom: 0, right: 0, borderBottom: `3px solid ${COLORS.amber}`, borderRight: `3px solid ${COLORS.amber}` },
            ].map((s, i) => (
              <div key={i} style={{
                position: "absolute", width: 24, height: 24, ...s, borderRadius: 4,
              }} />
            ))}
            {/* Fish silhouette placeholder */}
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              opacity: 0.2,
            }}>
              <span style={{ fontSize: 64 }}>🐟</span>
            </div>
            {/* Scanning line animation */}
            <div style={{
              position: "absolute", left: 4, right: 4, height: 2,
              background: `linear-gradient(90deg, transparent, ${COLORS.amber}, transparent)`,
              top: "50%", borderRadius: 1,
              animation: "scanLine 2s ease-in-out infinite",
            }} />
          </div>
        </div>

        {/* Top bar */}
        <div style={{
          position: "absolute", top: 30, left: 0, right: 0,
          padding: "0 18px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 20, color: COLORS.cloud }}>✕</span>
          <span style={{ fontSize: 12, color: COLORS.amberGlow, fontWeight: 700, letterSpacing: "0.05em" }}>
            IDENTIFICAR PEIXE
          </span>
          <span style={{ fontSize: 18, color: COLORS.cloud }}>⚡</span>
        </div>

        {/* Bottom hint */}
        <div style={{
          position: "absolute", bottom: 80, left: 0, right: 0,
          textAlign: "center",
        }}>
          <div style={{
            display: "inline-block", padding: "8px 20px", borderRadius: 24,
            background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
          }}>
            <span style={{ fontSize: 12, color: COLORS.mist, fontWeight: 500 }}>
              Aponte a câmera para o peixe
            </span>
          </div>
        </div>

        {/* Capture button */}
        <div style={{
          position: "absolute", bottom: 16, left: 0, right: 0,
          display: "flex", justifyContent: "center",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            border: `3px solid ${COLORS.amber}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 24px ${COLORS.amber}44`,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.sunrise})`,
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Species Card Screen Mockup ──
function SpeciesScreen() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, padding: "36px 18px 8px", overflow: "hidden" }}>
        <div style={{ fontSize: 11, color: COLORS.fog, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
          Espécies Identificadas
        </div>

        {/* Result card */}
        <div style={{
          borderRadius: 20, overflow: "hidden",
          background: COLORS.riverDark,
          border: `1px solid ${COLORS.riverMid}`,
          marginBottom: 14,
        }}>
          {/* Fish image placeholder */}
          <div style={{
            height: 130, background: `linear-gradient(135deg, ${COLORS.riverMid}, ${COLORS.mataTeal}33)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <span style={{ fontSize: 56, opacity: 0.6 }}>🐟</span>
            {/* Confidence badge */}
            <div style={{
              position: "absolute", top: 10, right: 10,
              padding: "4px 10px", borderRadius: 20,
              background: `${COLORS.verde}22`, border: `1px solid ${COLORS.verde}66`,
            }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: COLORS.verde }}>96%</span>
            </div>
          </div>

          <div style={{ padding: "14px 16px" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.cloud, fontFamily: "'Outfit', sans-serif" }}>
              Tucunaré-Azul
            </div>
            <div style={{ fontSize: 11, color: COLORS.mataTeal, fontStyle: "italic", marginBottom: 10 }}>
              Cichla piquiti
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              <span style={{
                fontSize: 9, padding: "4px 10px", borderRadius: 20,
                background: `${COLORS.mataTeal}22`, color: COLORS.mataGlow, fontWeight: 700,
              }}>Água doce</span>
              <span style={{
                fontSize: 9, padding: "4px 10px", borderRadius: 20,
                background: `${COLORS.amber}22`, color: COLORS.amberLight, fontWeight: 700,
              }}>Exótica</span>
              <span style={{
                fontSize: 9, padding: "4px 10px", borderRadius: 20,
                background: `${COLORS.verde}22`, color: COLORS.verde, fontWeight: 700,
              }}>Liberado</span>
            </div>

            {/* Info grid */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8,
            }}>
              {[
                { label: "Tam. mínimo", value: "30 cm", icon: "📏" },
                { label: "Cota diária", value: "10 un.", icon: "📋" },
                { label: "Melhor isca", value: "Artificial", icon: "🪝" },
                { label: "Horário", value: "06h-09h", icon: "🌅" },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "8px 10px", borderRadius: 10,
                  background: COLORS.deepWater,
                  border: `1px solid ${COLORS.riverMid}`,
                }}>
                  <div style={{ fontSize: 9, color: COLORS.fog, marginBottom: 2 }}>{item.icon} {item.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.cloud }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNav active={3} />
    </div>
  );
}

// ── Typography Showcase ──
function TypoShowcase() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {[
        { text: "Onde pescar, quando pescar.", font: "'Outfit', sans-serif", weight: 900, size: 32, color: COLORS.white, tracking: "-0.03em" },
        { text: "Descubra o peixe em segundos", font: "'Outfit', sans-serif", weight: 700, size: 22, color: COLORS.cloud, tracking: "-0.02em" },
        { text: "Seu companheiro de pesca inteligente", font: "'DM Sans', sans-serif", weight: 500, size: 16, color: COLORS.mist, tracking: "0" },
        { text: "PESCA LIBERADA · DEFESO · REGULAMENTAÇÃO", font: "'DM Sans', sans-serif", weight: 700, size: 12, color: COLORS.amber, tracking: "0.12em" },
        { text: "Dados de clima, lua e maré capturados automaticamente para cada registro no seu diário de pesca.", font: "'DM Sans', sans-serif", weight: 400, size: 14, color: COLORS.fog, tracking: "0.01em", maxW: 480 },
      ].map((t, i) => (
        <div key={i}>
          <p style={{
            fontFamily: t.font, fontWeight: t.weight, fontSize: t.size,
            color: t.color, letterSpacing: t.tracking, margin: 0,
            lineHeight: 1.3, maxWidth: t.maxW || "none",
          }}>{t.text}</p>
          <span style={{ fontSize: 10, color: COLORS.riverLight, marginTop: 4, display: "block" }}>
            {t.font.replace(/'/g, "")} · {t.weight} · {t.size}px · ls: {t.tracking}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── UI Components Showcase ──
function UIComponents() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Buttons */}
      <div>
        <div style={{ fontSize: 11, color: COLORS.fog, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Botões</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button style={{
            padding: "12px 28px", borderRadius: 14, border: "none", cursor: "pointer",
            background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.sunrise})`,
            color: "#000", fontWeight: 800, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
            boxShadow: `0 4px 20px ${COLORS.amber}44`,
            letterSpacing: "-0.01em",
          }}>Identificar Peixe</button>
          <button style={{
            padding: "12px 28px", borderRadius: 14, cursor: "pointer",
            background: "transparent",
            border: `1.5px solid ${COLORS.amber}`,
            color: COLORS.amber, fontWeight: 700, fontSize: 14,
            fontFamily: "'DM Sans', sans-serif",
          }}>Ver no Mapa</button>
          <button style={{
            padding: "12px 28px", borderRadius: 14, cursor: "pointer",
            background: COLORS.riverDark,
            border: `1px solid ${COLORS.riverMid}`,
            color: COLORS.mist, fontWeight: 600, fontSize: 14,
            fontFamily: "'DM Sans', sans-serif",
          }}>Cancelar</button>
        </div>
      </div>

      {/* Status badges */}
      <div>
        <div style={{ fontSize: 11, color: COLORS.fog, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Status — Semáforo de Pesca</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { label: "PESCA LIBERADA", color: COLORS.verde, icon: "✓" },
            { label: "COM RESTRIÇÕES", color: COLORS.amarelo, icon: "!" },
            { label: "DEFESO TOTAL", color: COLORS.vermelho, icon: "✕" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "10px 18px", borderRadius: 14,
              background: `${s.color}15`,
              border: `1.5px solid ${s.color}55`,
              display: "flex", alignItems: "center", gap: 10,
              boxShadow: `0 0 20px ${s.color}15`,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: `${s.color}22`, display: "flex", alignItems: "center", justifyContent: "center",
                border: `2px solid ${s.color}`,
                fontSize: 12, color: s.color, fontWeight: 900,
              }}>{s.icon}</div>
              <span style={{ fontSize: 13, fontWeight: 800, color: s.color, letterSpacing: "0.02em" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fish confidence indicator */}
      <div>
        <div style={{ fontSize: 11, color: COLORS.fog, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Confiança da IA</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            { species: "Tucunaré-Azul", pct: 96, color: COLORS.verde },
            { species: "Tucunaré-Amarelo", pct: 72, color: COLORS.amarelo },
            { species: "Robalo-Peva", pct: 43, color: COLORS.vermelho },
          ].map((r, i) => (
            <div key={i} style={{
              flex: "1 1 160px", padding: "12px 16px", borderRadius: 14,
              background: COLORS.riverDark, border: `1px solid ${COLORS.riverMid}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.cloud }}>{r.species}</span>
                <span style={{ fontSize: 16, fontWeight: 900, color: r.color, fontFamily: "'Outfit', sans-serif" }}>{r.pct}%</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: COLORS.riverMid }}>
                <div style={{
                  height: "100%", borderRadius: 2, width: `${r.pct}%`,
                  background: `linear-gradient(90deg, ${r.color}88, ${r.color})`,
                  boxShadow: `0 0 8px ${r.color}44`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Icon System ──
function IconSystem() {
  const icons = [
    { name: "Início", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" /><path d="M9 21V12h6v9" /></svg> },
    { name: "Capturar", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3.5" /><path d="M5 7H3.5A1.5 1.5 0 002 8.5v9A1.5 1.5 0 003.5 19h17a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0020.5 7H19l-1.5-2h-7L9 7H5z" /></svg> },
    { name: "Mapa", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg> },
    { name: "Espécies", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c3-6 7-8 11-7 4-1 8 1 11 7-3 6-7 8-11 7-4 1-8-1-11-7z" /><circle cx="17" cy="12" r="1.5" fill="currentColor" /><path d="M1 12l3-3M1 12l3 3" /></svg> },
    { name: "Perfil", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0112 0v1" /></svg> },
    { name: "Clima", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg> },
    { name: "Lua", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg> },
    { name: "Anzol", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3v6a4 4 0 01-4 4 4 4 0 01-4-4V3" /><path d="M12 13v5a3 3 0 006 0" /><circle cx="12" cy="2" r="1" fill="currentColor" /></svg> },
  ];
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {icons.map((ic, i) => (
        <div key={i} style={{
          width: 72, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: COLORS.riverDark, border: `1px solid ${COLORS.riverMid}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: COLORS.mist, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.amber; e.currentTarget.style.color = COLORS.amber; e.currentTarget.style.boxShadow = `0 4px 16px ${COLORS.amber}22`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.riverMid; e.currentTarget.style.color = COLORS.mist; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ width: 22, height: 22 }}>{ic.svg}</div>
          </div>
          <span style={{ fontSize: 10, color: COLORS.fog, textAlign: "center", fontWeight: 500 }}>{ic.name}</span>
        </div>
      ))}
    </div>
  );
}


// ── Animated Shader Background ──
export function ShaderAnimation() {
  const containerRef = useRef(null)
  const sceneRef = useRef({
    camera: null,
    scene: null,
    renderer: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    // Load Three.js dynamically
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js"
    script.onload = () => {
      if (containerRef.current && window.THREE) {
        initThreeJS()
      }
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose()
      }
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const initThreeJS = () => {
    if (!containerRef.current || !window.THREE) return

    const THREE = window.THREE
    const container = containerRef.current
    container.innerHTML = ""

    const camera = new THREE.Camera()
    camera.position.z = 1
    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneBufferGeometry(2, 2)

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    }

    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;
        
      float random (in float x) {
          return fract(sin(x)*1e4);
      }
      float random (vec2 st) {
          return fract(sin(dot(st.xy,
                               vec2(12.9898,78.233)))*
              43758.5453123);
      }
      
      varying vec2 vUv;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256,256);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);       
          
        float t = time*0.06+random(uv.x)*0.4;
        float lineWidth = 0.0008;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*1.0 - length(uv));        
          }
        }
        
        // Blend the shader with the brand colors
        color.r = max(color.r, 0.05); // Add a subtle deep tint
        gl_FragColor = vec4(color[2],color[1],color[0], 0.35); // Lower opacity to serve as BG
      }
    `

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ alpha: true }) // enable alpha
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    sceneRef.current = { camera, scene, renderer, uniforms, animationId: null }

    const onWindowResize = () => {
      const rect = container.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
    }

    animate()
  }

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.6 }}
    />
  )
}


// ══════════════════════════════════════════════════════
// ██  MAIN APP
// ══════════════════════════════════════════════════════
export default function FishFinderBrand() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    "hero", "logo", "colors", "typography", "icons", "components", "screens", "manifesto"
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.nightRiver,
      fontFamily: "'DM Sans', sans-serif",
      color: COLORS.white,
      overflowX: "hidden",
    }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes scanLine {
          0%, 100% { top: 10%; opacity: 0.4; }
          50% { top: 85%; opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px ${COLORS.amber}22; }
          50% { box-shadow: 0 0 40px ${COLORS.amber}44; }
        }
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.nightRiver}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.riverMid}; border-radius: 3px; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative",
        padding: "40px 24px",
        textAlign: "center",
      }}>
        <ShaderAnimation />

        {/* Ambient glow */}
        <div style={{
          position: "absolute",
          width: 500, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.amber}08 0%, transparent 70%)`,
          top: "20%", left: "50%", transform: "translateX(-50%)",
          pointerEvents: "none",
        }} />

        <div style={{ animation: "fadeUp 0.8s ease-out", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 32, animation: "float 4s ease-in-out infinite" }}>
            <FishFinderLogo size={64} variant="full" />
          </div>

          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            maxWidth: 700,
            marginBottom: 20,
          }}>
            <span style={{ color: COLORS.cloud }}>A identidade visual de </span>
            <span style={{
              background: `linear-gradient(135deg, ${COLORS.amberGlow}, ${COLORS.amber}, ${COLORS.sunrise})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>quem entende o rio.</span>
          </h1>

          <p style={{
            fontSize: "clamp(14px, 2vw, 18px)",
            color: COLORS.fog,
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Brand Book &amp; Design System do FishFinder — o primeiro app de pesca esportiva 100% brasileiro. Cada detalhe foi pensado para funcionar com uma mão, ao sol, com peixe na outra.
          </p>

          <div style={{
            marginTop: 40,
            display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap",
          }}>
            {["Natureza", "Tecnologia", "Brasil", "Golden Hour"].map(tag => (
              <span key={tag} style={{
                padding: "6px 16px", borderRadius: 20,
                background: COLORS.riverDark,
                border: `1px solid ${COLORS.riverMid}`,
                fontSize: 12, color: COLORS.mist, fontWeight: 600,
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "float 2s ease-in-out infinite",
        }}>
          <span style={{ fontSize: 10, color: COLORS.fog, letterSpacing: "0.1em", textTransform: "uppercase" }}>Explorar</span>
          <span style={{ fontSize: 20, color: COLORS.amber }}>↓</span>
        </div>
      </section>

      {/* ── CONTENT SECTIONS ── */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>

        {/* LOGO SECTION */}
        <section style={{ paddingTop: 80, paddingBottom: 60 }}>
          <SectionTitle
            number="01"
            title="Logo & Marca"
            subtitle="O símbolo combina um peixe estilizado em movimento com anéis de sonar — representando a fusão entre natureza e tecnologia. O dourado evoca o golden hour, o momento mágico da pesca."
          />

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24,
            marginTop: 8,
          }}>
            {/* Logo on dark */}
            <div style={{
              borderRadius: 20, padding: 40,
              background: COLORS.nightRiver,
              border: `1px solid ${COLORS.riverMid}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24,
              minHeight: 200,
            }}>
              <FishFinderLogo size={56} variant="full" />
              <span style={{ fontSize: 10, color: COLORS.fog }}>Sobre fundo escuro (padrão)</span>
            </div>

            {/* Logo compact */}
            <div style={{
              borderRadius: 20, padding: 40,
              background: COLORS.deepWater,
              border: `1px solid ${COLORS.riverMid}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24,
              minHeight: 200,
            }}>
              <FishFinderLogo size={48} variant="compact" />
              <span style={{ fontSize: 10, color: COLORS.fog }}>Versão compacta</span>
            </div>

            {/* Icon only */}
            <div style={{
              borderRadius: 20, padding: 40,
              background: `linear-gradient(135deg, ${COLORS.riverDark}, ${COLORS.deepWater})`,
              border: `1px solid ${COLORS.riverMid}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24,
              minHeight: 200,
            }}>
              <FishFinderLogo size={64} showText={false} />
              <span style={{ fontSize: 10, color: COLORS.fog }}>Ícone do app</span>
            </div>
          </div>

          {/* Logo rules */}
          <div style={{
            marginTop: 24, padding: "20px 24px", borderRadius: 16,
            background: COLORS.riverDark, border: `1px solid ${COLORS.riverMid}`,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.amber, marginBottom: 8 }}>Regras de uso</div>
            <div style={{ fontSize: 13, color: COLORS.fog, lineHeight: 1.8 }}>
              Área de respiro mínima: 1× a largura do ícone em todos os lados. Nunca usar sobre fundos claros sem inversão. O gradiente dourado é a assinatura — nunca substituir por cor sólida. "Fish" sempre em dourado, "Finder" sempre em branco/cinza claro.
            </div>
          </div>
        </section>

        {/* COLORS SECTION */}
        <section style={{ paddingBottom: 60 }}>
          <SectionTitle
            number="02"
            title="Paleta de Cores"
            subtitle="Extraída das águas escuras dos rios brasileiros ao amanhecer, do brilho dourado do sol na linha d'água e do verde profundo da mata ciliar. Dark-first para uso em campo."
          />

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.amber, marginBottom: 12, paddingLeft: 36 }}>Golden Hour — Acentos primários</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingLeft: 36 }}>
              <Swatch name="Amber" hex={COLORS.amber} subtitle="CTA principal" />
              <Swatch name="Amber Light" hex={COLORS.amberLight} subtitle="Hover / secundário" />
              <Swatch name="Amber Glow" hex={COLORS.amberGlow} subtitle="Destaques text" />
              <Swatch name="Sunrise" hex={COLORS.sunrise} subtitle="Gradientes / urgência" />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.mataTeal, marginBottom: 12, paddingLeft: 36 }}>Mata & Água — Natureza</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingLeft: 36 }}>
              <Swatch name="Mata Teal" hex={COLORS.mataTeal} subtitle="Sucesso / natureza" />
              <Swatch name="Mata Light" hex={COLORS.mataLight} subtitle="Links / info" />
              <Swatch name="Mata Glow" hex={COLORS.mataGlow} subtitle="Tags / badges" />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.mist, marginBottom: 12, paddingLeft: 36 }}>Rio — Fundos & Superfícies</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingLeft: 36 }}>
              <Swatch name="Night River" hex={COLORS.nightRiver} subtitle="Fundo principal" />
              <Swatch name="Deep Water" hex={COLORS.deepWater} subtitle="Cards / nav" />
              <Swatch name="River Dark" hex={COLORS.riverDark} subtitle="Superfícies" />
              <Swatch name="River Mid" hex={COLORS.riverMid} subtitle="Bordas / dividers" />
              <Swatch name="River Light" hex={COLORS.riverLight} subtitle="Bordas hover" />
            </div>
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.verde, marginBottom: 12, paddingLeft: 36 }}>Semáforo — Status</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingLeft: 36 }}>
              <Swatch name="Liberado" hex={COLORS.verde} subtitle="Pode pescar" />
              <Swatch name="Restrição" hex={COLORS.amarelo} subtitle="Com restrições" />
              <Swatch name="Defeso" hex={COLORS.vermelho} subtitle="Proibido" />
            </div>
          </div>
        </section>

        {/* TYPOGRAPHY SECTION */}
        <section style={{ paddingBottom: 60 }}>
          <SectionTitle
            number="03"
            title="Tipografia"
            subtitle="Outfit para títulos — geométrica, bold, moderna. DM Sans para corpo — humanista, legível ao sol, confortável em textos longos. Ambas com excelente legibilidade em telas molhadas."
          />
          <div style={{ paddingLeft: 36 }}>
            <TypoShowcase />
          </div>
        </section>

        {/* ICONS SECTION */}
        <section style={{ paddingBottom: 60 }}>
          <SectionTitle
            number="04"
            title="Iconografia"
            subtitle="Linha fina (1.5px), cantos arredondados, estilo outline. Cada ícone é reconhecível em 24×24px — essencial para botões que serão tocados com dedos molhados."
          />
          <div style={{ paddingLeft: 36 }}>
            <IconSystem />
          </div>
        </section>

        {/* UI COMPONENTS SECTION */}
        <section style={{ paddingBottom: 60 }}>
          <SectionTitle
            number="05"
            title="Componentes UI"
            subtitle="Botões grandes (mín. 48px de altura), contraste WCAG AA, bordas arredondadas (14px padrão). O semáforo de pesca é o componente mais importante — comunica status em milissegundos."
          />
          <div style={{ paddingLeft: 36 }}>
            <UIComponents />
          </div>
        </section>

        {/* SCREENS SECTION */}
        <section style={{ paddingBottom: 60 }}>
          <SectionTitle
            number="06"
            title="Telas do App"
            subtitle="Mockups das telas principais do MVP. Dark theme para uso em campo — menor brilho, economia de bateria em OLED, melhor visibilidade ao sol."
          />
          <div style={{
            display: "flex", gap: 32, flexWrap: "wrap",
            justifyContent: "center",
            paddingTop: 16,
          }}>
            <PhoneMockup label="Tela Início">
              <HomeScreen />
            </PhoneMockup>
            <PhoneMockup label="Câmera IA">
              <CaptureScreen />
            </PhoneMockup>
            <PhoneMockup label="Ficha da Espécie">
              <SpeciesScreen />
            </PhoneMockup>
          </div>
        </section>

        {/* MANIFESTO SECTION */}
        <section style={{ paddingTop: 40, paddingBottom: 100 }}>
          <div style={{
            borderRadius: 24, padding: "48px 40px",
            background: `linear-gradient(135deg, ${COLORS.deepWater}, ${COLORS.riverDark})`,
            border: `1px solid ${COLORS.riverMid}`,
            position: "relative", overflow: "hidden",
          }}>
            {/* Ambient glow */}
            <div style={{
              position: "absolute", top: -60, right: -60,
              width: 200, height: 200, borderRadius: "50%",
              background: `radial-gradient(circle, ${COLORS.amber}0A 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />

            <div style={{
              fontSize: 11, color: COLORS.amber, fontWeight: 800,
              letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16,
            }}>07 · MANIFESTO DE MARCA</div>

            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(22px, 4vw, 36px)",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: 24,
              maxWidth: 600,
            }}>
              <span style={{ color: COLORS.cloud }}>Não somos um app </span>
              <span style={{ color: COLORS.amber }}>gringo traduzido.</span>
              <br />
              <span style={{ color: COLORS.cloud }}>Somos </span>
              <span style={{
                background: `linear-gradient(135deg, ${COLORS.mataTeal}, ${COLORS.mataGlow})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>feitos do rio.</span>
            </h2>

            <div style={{
              fontSize: 15, color: COLORS.fog, lineHeight: 1.8,
              maxWidth: 580,
            }}>
              <p style={{ marginBottom: 16 }}>
                O FishFinder nasceu para o pescador que acorda às 4 da manhã,
                dirige 3 horas até a represa e precisa saber — antes de jogar a linha —
                se pode pescar ali hoje.
              </p>
              <p style={{ marginBottom: 16 }}>
                Nossa identidade visual é o reflexo do golden hour na água:
                escura como o rio antes do amanhecer, dourada como o primeiro sol,
                verde como a mata que protege as margens.
              </p>
              <p>
                Cada pixel existe para servir quem está com as mãos molhadas,
                o sol no rosto e um tucunaré na linha.
              </p>
            </div>

            <div style={{
              marginTop: 32, display: "flex", gap: 24, flexWrap: "wrap",
            }}>
              {[
                { value: "6M+", label: "pescadores no Brasil" },
                { value: "100+", label: "espécies esportivas" },
                { value: "8.500km", label: "de litoral" },
                { value: "R$1B", label: "mercado anual" },
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{
                    fontSize: 24, fontWeight: 900, fontFamily: "'Outfit', sans-serif",
                    background: `linear-gradient(135deg, ${COLORS.amberGlow}, ${COLORS.amber})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: COLORS.fog }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div style={{
          textAlign: "center", paddingBottom: 48,
          borderTop: `1px solid ${COLORS.riverMid}`,
          paddingTop: 32,
        }}>
          <FishFinderLogo size={28} variant="compact" />
          <p style={{ fontSize: 11, color: COLORS.riverLight, marginTop: 12 }}>
            Brand Identity System · v1.0 · 2026
          </p>
          <p style={{ fontSize: 10, color: COLORS.riverMid, marginTop: 4 }}>
            "Onde pescar, quando pescar, o que você pescou e se pode pescar."
          </p>
        </div>
      </div>
    </div>
  );
}
