import { useState } from 'react';
import { COLORS as C } from '../theme/colors';
import Icon from '../components/Icon';
import { CATCHES } from '../data/mockData';

export default function ProfileScreen() {
    const [subTab, setSubTab] = useState("diario");

    return (
        <div style={{ padding: "0 16px 100px 16px", animation: "fadeUp 0.4s ease-out" }}>
            {/* Profile header */}
            <div style={{ padding: "24px 0 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, background: C.surface, padding: 20, borderRadius: 24, border: `1px solid ${C.border}`, boxShadow: `0 8px 24px rgba(0,0,0,0.2)` }}>
                    <div style={{
                        width: 72, height: 72, borderRadius: 36, background: `linear-gradient(135deg, ${C.amber}, ${C.sunrise})`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, color: "#000",
                        boxShadow: `0 4px 20px ${C.amber}50`
                    }}>PR</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 22, fontWeight: 900, fontFamily: 'Outfit, sans-serif' }}>Pedro Ribeiro</div>
                        <div style={{ fontSize: 13, color: C.textDim, marginTop: 4 }}>Pescador Esportivo</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, opacity: 0.8 }}>
                            <Icon name="pin" size={12} color={C.textMid} />
                            <span style={{ fontSize: 11, color: C.textMid }}>São Paulo, SP</span>
                        </div>
                    </div>
                    <div style={{ width: 40, height: 40, borderRadius: 20, background: C.cardHover, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.border}` }}>
                        <Icon name="search" size={16} color={C.textMid} />
                    </div>
                </div>
            </div>

            {/* Stats cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                {[
                    { value: "47", label: "Capturas Totais", icon: "fish" },
                    { value: "12", label: "Espécies", icon: "star" },
                    { value: "4.2kg", label: "Maior Recorde", icon: "target" },
                    { value: "06:30", label: "Horário de Pico", icon: "clock" },
                ].map(st => (
                    <div key={st.label} style={{
                        background: C.card, borderRadius: 20, padding: "16px",
                        border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12,
                        boxShadow: `0 4px 12px rgba(0,0,0,0.1)`
                    }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.water}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon name={st.icon} size={18} color={C.water} />
                        </div>
                        <div>
                            <div style={{ fontSize: 20, fontWeight: 900, color: C.text, fontFamily: 'Outfit, sans-serif' }}>{st.value}</div>
                            <div style={{ fontSize: 11, color: C.textDim, marginTop: 2, fontWeight: 600 }}>{st.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sub-tabs */}
            <div style={{ display: "flex", gap: 4, marginBottom: 20, background: C.surface, borderRadius: 16, padding: 4, border: `1px solid ${C.border}` }}>
                {[
                    { key: "diario", label: "Diário de Pesca" },
                    { key: "stats", label: "Estatísticas Detalhadas" },
                ].map(t => (
                    <div key={t.key} onClick={() => setSubTab(t.key)} style={{
                        flex: 1, padding: "12px 0", borderRadius: 12, textAlign: "center",
                        fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
                        background: subTab === t.key ? C.cardHover : "transparent",
                        color: subTab === t.key ? C.text : C.textDim,
                        boxShadow: subTab === t.key ? "0 4px 12px rgba(0,0,0,0.2)" : "none"
                    }}>{t.label}</div>
                ))}
            </div>

            {subTab === "diario" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {CATCHES.map(c => (
                        <div key={c.id} style={{
                            background: C.card, borderRadius: 20, padding: 16, border: `1px solid ${C.border}`,
                            boxShadow: `0 4px 16px rgba(0,0,0,0.15)`
                        }}>
                            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                                <div style={{
                                    width: 64, height: 64, borderRadius: 16, fontSize: 32,
                                    background: `linear-gradient(135deg, ${C.water}15, ${C.surface})`, border: `1px solid ${C.water}30`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    boxShadow: "inset 0 0 10px rgba(0,0,0,0.2)"
                                }}>{c.img}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                        <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{c.species}</div>
                                        <Icon name="chevron" size={16} color={C.textDim} />
                                    </div>
                                    <div style={{ fontSize: 13, color: C.textMid, marginTop: 4 }}>{c.weight}kg · {c.length}cm</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
                                        <Icon name="pin" size={10} color={C.textDim} />
                                        <span style={{ fontSize: 11, color: C.textDim, fontWeight: 500 }}>{c.spot}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ height: 1, background: C.border, margin: "16px 0" }} />

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", gap: 12 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                        <Icon name="clock" size={12} color={C.textDim} />
                                        <span style={{ fontSize: 11, color: C.textMid }}>{c.date} {c.time}</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                        <Icon name="sun" size={12} color={C.amber} />
                                        <span style={{ fontSize: 11, color: C.textMid }}>Índice {c.solunar}</span>
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.surface, padding: "4px 8px", borderRadius: 8 }}>
                                    <Icon name="moon" size={12} color={C.textDim} />
                                    <span style={{ fontSize: 10, color: C.textDim }}>{c.moon}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ padding: 40, textAlign: "center", color: C.textDim, background: C.card, borderRadius: 20, border: `1px dashed ${C.border}` }}>
                    Gráficos e estatísticas avançadas em desenvolvimento.
                </div>
            )}
        </div>
    );
}
