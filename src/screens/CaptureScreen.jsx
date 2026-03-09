import { useState } from 'react';
import { COLORS as C } from '../theme/colors';
import Icon from '../components/Icon';
import { analyzeFishImage, saveCatch } from '../services/api';

export default function CaptureScreen({ setTab }) {
    const [step, setStep] = useState(0); // 0=camera, 1=resultado, 2=form, 3=salvo
    const [loading, setLoading] = useState(false);

    const handleCapture = async () => {
        setLoading(true);
        // Simulate AI processing
        setTimeout(() => {
            setLoading(false);
            setStep(1);
        }, 1500);
    };

    const handleSave = async () => {
        setLoading(true);
        await saveCatch({});
        setLoading(false);
        setStep(3);
    };

    if (step === 0) return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", position: "relative", background: "#000" }}>
            {/* Top bar */}
            <div style={{
                position: "absolute", top: 16, left: 16, right: 16, zIndex: 20,
                display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
                <div onClick={() => setTab?.(0)} style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)", borderRadius: 20, cursor: "pointer" }}>
                    <Icon name="x" size={24} color="#FFF" />
                </div>
                <span style={{ fontSize: 14, color: C.amber, fontWeight: 800, letterSpacing: 1, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                    IDENTIFICAR PEIXE
                </span>
                <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)", borderRadius: 20 }}>
                    <span style={{ fontSize: 20 }}>⚡</span>
                </div>
            </div>

            {/* Camera viewfinder */}
            <div style={{
                flex: 1, background: `radial-gradient(ellipse at center, #1a2a1a 0%, #050a05 100%)`,
                position: "relative",
                display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
            }}>
                {loading ? (
                    <div style={{ textAlign: "center", color: C.green }}>
                        <div style={{ fontSize: 40, animation: "pulse 1s infinite" }}>🤖</div>
                        <div style={{ marginTop: 16, fontSize: 13, fontWeight: 600 }}>Analisando IA...</div>
                    </div>
                ) : (
                    <>
                        <div style={{
                            width: 240, height: 240, position: "relative",
                        }}>
                            {[
                                { top: 0, left: 0, borderTop: `4px solid ${C.amber}`, borderLeft: `4px solid ${C.amber}` },
                                { top: 0, right: 0, borderTop: `4px solid ${C.amber}`, borderRight: `4px solid ${C.amber}` },
                                { bottom: 0, left: 0, borderBottom: `4px solid ${C.amber}`, borderLeft: `4px solid ${C.amber}` },
                                { bottom: 0, right: 0, borderBottom: `4px solid ${C.amber}`, borderRight: `4px solid ${C.amber}` },
                            ].map((s, i) => (
                                <div key={i} style={{
                                    position: "absolute", width: 32, height: 32, ...s, borderRadius: 8,
                                }} />
                            ))}

                            <div style={{
                                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                                opacity: 0.1, fontSize: 80
                            }}>🐟</div>

                            <div style={{
                                position: "absolute", left: 8, right: 8, height: 2,
                                background: `linear-gradient(90deg, transparent, ${C.amber}, transparent)`,
                                top: "50%", borderRadius: 1,
                                animation: "scanLine 2.5s ease-in-out infinite",
                                boxShadow: `0 0 16px ${C.amber}`
                            }} />
                        </div>

                        <div style={{ position: "absolute", bottom: 120, left: 16, right: 16, textAlign: "center" }}>
                            <div style={{
                                display: "inline-block", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)",
                                padding: "10px 24px", borderRadius: 30, border: "1px solid rgba(255,255,255,0.1)"
                            }}>
                                <span style={{ fontSize: 13, color: "#DDD", fontWeight: 600 }}>Enquadre o peixe inteiro na tela</span>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Shutter bottom bar */}
            <div style={{
                height: 140, background: "#000", display: "flex", alignItems: "center", justifyContent: "center",
                paddingBottom: 20
            }}>
                <div onClick={handleCapture} style={{
                    width: 80, height: 80, borderRadius: 40, border: `4px solid rgba(255,255,255,0.3)`,
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    transition: "transform 0.2s"
                }}
                    onMouseDown={e => e.currentTarget.style.transform = "scale(0.95)"}
                    onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                >
                    <div style={{ width: 64, height: 64, borderRadius: 32, background: loading ? C.amber : "#FFF", transition: "background 0.3s" }} />
                </div>
            </div>
        </div>
    );

    if (step === 1) return (
        <div style={{ padding: "16px 16px 100px 16px", animation: "fadeUp 0.3s ease-out", minHeight: "100vh" }}>
            <div onClick={() => setStep(0)} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, cursor: "pointer", padding: "8px 0" }}>
                <Icon name="back" size={20} color={C.textMid} />
                <span style={{ fontSize: 14, color: C.textMid, fontWeight: 600 }}>Tirar outra foto</span>
            </div>

            <div style={{
                background: `linear-gradient(135deg, ${C.surface}, ${C.bg})`,
                borderRadius: 24, height: 240, marginBottom: 20, border: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, position: "relative",
                boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)"
            }}>
                🐟
                <div style={{
                    position: "absolute", bottom: -16, right: 24, background: C.greenBg, border: `1px solid ${C.green}`,
                    borderRadius: 16, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6,
                    boxShadow: `0 8px 24px rgba(0,0,0,0.4)`
                }}>
                    <span style={{ fontSize: 14, fontWeight: 900, color: C.green }}>94% IA</span>
                </div>
            </div>

            <div style={{
                background: C.greenBg, border: `1px solid ${C.green}40`, borderRadius: 20,
                padding: 20, marginBottom: 16, boxShadow: `0 4px 20px rgba(0,255,0,0.05)`
            }}>
                <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 4, fontFamily: 'Outfit, sans-serif', color: C.text }}>Tucunaré-açu</div>
                <div style={{ fontSize: 13, color: C.green, fontStyle: "italic", fontWeight: 600 }}>Cichla temensis</div>
                <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 8, background: `${C.green}20`, color: C.green, fontWeight: 700 }}>✓ Nativa</span>
                    <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 8, background: `${C.green}20`, color: C.green, fontWeight: 700 }}>✓ Pesca liberada</span>
                    <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 8, background: `${C.amber}20`, color: C.amber, fontWeight: 700 }}>Mín. 35 cm</span>
                </div>
            </div>

            <div style={{ background: C.cardHover, borderRadius: 16, padding: 16, border: `1px solid ${C.border}`, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <Icon name="star" size={16} color={C.water} />
                    <div style={{ fontSize: 13, fontWeight: 800, color: C.water, textTransform: "uppercase" }}>Dica rápida</div>
                </div>
                <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>
                    As iscas artificiais de hélice costumam ser muito eficientes no início da manhã para essa espécie.
                </div>
            </div>

            <div onClick={() => setStep(2)} style={{
                background: `linear-gradient(135deg, ${C.water}, ${C.waterDark})`,
                borderRadius: 16, padding: "18px 0", textAlign: "center",
                fontWeight: 800, fontSize: 16, cursor: "pointer", color: "#FFF",
                boxShadow: `0 8px 32px ${C.waterDark}60`, transition: "transform 0.2s"
            }}
                onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
                onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            >
                Avançar para o Diário
            </div>
        </div>
    );

    if (step === 2) return (
        <div style={{ padding: "16px 16px 100px 16px", animation: "fadeUp 0.3s ease-out", minHeight: "100vh" }}>
            <div onClick={() => setStep(1)} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, cursor: "pointer", padding: "8px 0" }}>
                <Icon name="back" size={20} color={C.textMid} />
                <span style={{ fontSize: 14, color: C.textMid, fontWeight: 600 }}>Voltar ao Resultado</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 24, fontFamily: 'Outfit, sans-serif' }}>Registrar Captura</div>

            {[{ label: "Espécie", value: "Tucunaré-açu", locked: true },
            { label: "Peso estimado (kg)", value: "", placeholder: "Ex: 4.2" },
            { label: "Comprimento (cm)", value: "", placeholder: "Ex: 52" }
            ].map(f => (
                <div key={f.label} style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 12, color: C.textDim, marginBottom: 6, fontWeight: 700 }}>{f.label}</div>
                    {f.locked ? (
                        <div style={{
                            background: `${C.water}10`, borderRadius: 12, padding: "14px 16px",
                            border: `1px solid ${C.water}30`, fontSize: 15, color: C.water, fontWeight: 700,
                            display: "flex", justifyContent: "space-between", alignItems: "center"
                        }}>
                            {f.value}
                            <Icon name="check" size={18} color={C.water} />
                        </div>
                    ) : (
                        <input
                            placeholder={f.placeholder}
                            style={{
                                background: C.surface, borderRadius: 12, padding: "14px 16px",
                                border: `1px solid ${C.border}`, fontSize: 15, color: C.text,
                                width: "100%", outline: "none", fontFamily: "inherit"
                            }}
                        />
                    )}
                </div>
            ))}

            <div style={{ fontSize: 12, color: C.textDim, fontWeight: 700, marginTop: 24, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
                Capturado automaticamente (GPS/Hora)
            </div>
            <div style={{
                background: C.surface, borderRadius: 16, padding: "16px", border: `1px solid ${C.border}`, marginBottom: 24,
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, boxShadow: "inset 0 2px 10px rgba(0,0,0,0.2)"
            }}>
                {[
                    { icon: "pin", label: "Local", value: "Jurumirim, SP" },
                    { icon: "sun", label: "Temp.", value: "28°C" },
                    { icon: "wind", label: "Vento", value: "8 km/h NE" },
                    { icon: "moon", label: "Lua", value: "Nova" },
                    { icon: "bar", label: "Pressão", value: "1013 hPa ↑" },
                    { icon: "clock", label: "Horário", value: "06:42" },
                ].map(c => (
                    <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 24, height: 24, borderRadius: 6, background: C.cardHover, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon name={c.icon} size={12} color={C.water} />
                        </div>
                        <div>
                            <span style={{ fontSize: 10, color: C.textDim, display: "block", marginBottom: 2 }}>{c.label}</span>
                            <span style={{ fontSize: 12, color: C.text, fontWeight: 700 }}>{c.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ fontSize: 12, color: C.textDim, fontWeight: 700, marginBottom: 12 }}>Privacidade do Local</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
                {["Exato", "Apenas Região", "Oculto"].map((p, i) => (
                    <div key={p} style={{
                        flex: 1, padding: "12px 0", borderRadius: 12, textAlign: "center", fontSize: 12, fontWeight: 700,
                        background: i === 1 ? `${C.water}20` : C.surface,
                        border: `1px solid ${i === 1 ? C.water + "50" : C.border}`,
                        color: i === 1 ? C.water : C.textDim, cursor: "pointer", transition: "all 0.2s"
                    }}>{p}</div>
                ))}
            </div>

            <div onClick={handleSave} style={{
                background: `linear-gradient(135deg, ${C.green}, #16A34A)`,
                borderRadius: 16, padding: "18px 0", textAlign: "center",
                fontWeight: 800, fontSize: 16, cursor: "pointer", color: "#000",
                boxShadow: `0 8px 32px rgba(34, 197, 94, 0.4)`, transition: "transform 0.2s"
            }}
                onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
                onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            >
                {loading ? "Salvando..." : "Salvar no Diário"}
            </div>
        </div>
    );

    return (
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", animation: "fadeUp 0.4s ease-out" }}>
            <div style={{
                width: 100, height: 100, borderRadius: 50, background: C.greenBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `3px solid ${C.green}`, marginBottom: 24,
                boxShadow: `0 0 60px ${C.green}40`
            }}>
                <Icon name="check" size={48} color={C.green} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 12, fontFamily: 'Outfit, sans-serif' }}>Captura Salva!</div>
            <div style={{ fontSize: 15, color: C.textDim, textAlign: "center", marginBottom: 40, lineHeight: 1.6, maxWidth: 300 }}>
                Tucunaré-açu registrado no seu diário em conjunto com as condições solunares atuais.
            </div>
            <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 340 }}>
                <div onClick={() => setStep(0)} style={{
                    flex: 1, padding: "16px 0", borderRadius: 16, textAlign: "center",
                    background: C.surface,
                    border: `1px solid ${C.border}`, fontSize: 14, fontWeight: 700, cursor: "pointer", color: C.textMid,
                }}>Nova Captura</div>
                <div onClick={() => setTab?.(4)} style={{
                    flex: 1, padding: "16px 0", borderRadius: 16, textAlign: "center",
                    background: `linear-gradient(135deg, ${C.water}, ${C.waterDark})`, fontSize: 14, fontWeight: 800, cursor: "pointer", color: "#FFF",
                    boxShadow: `0 4px 20px ${C.water}40`
                }}>Ver Diário</div>
            </div>
        </div>
    );
}
