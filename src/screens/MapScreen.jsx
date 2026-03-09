import { useState } from 'react';
import { COLORS as C } from '../theme/colors';
import Icon from '../components/Icon';
import { SPOTS } from '../data/mockData';

export default function MapScreen() {
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [filter, setFilter] = useState("Todos");
    const filters = ["Todos", "Rios", "Represas", "Pesqueiros", "Costão"];

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", paddingBottom: 80, animation: "fadeUp 0.4s ease-out" }}>
            {/* Search + filters */}
            <div style={{ padding: "16px", zIndex: 10 }}>
                <div style={{
                    background: C.surface, borderRadius: 12, padding: "12px 16px",
                    display: "flex", alignItems: "center", gap: 10, border: `1px solid ${C.border}`, marginBottom: 12,
                    boxShadow: `0 4px 12px rgba(0,0,0,0.2)`
                }}>
                    <Icon name="search" size={18} color={C.textDim} />
                    <input
                        placeholder="Buscar pesqueiro, rio, represa..."
                        style={{
                            background: 'transparent', border: 'none', color: C.text, fontSize: 14,
                            width: '100%', outline: 'none', fontFamily: 'inherit'
                        }}
                    />
                </div>
                <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                    {filters.map(f => (
                        <div key={f} onClick={() => setFilter(f)} style={{
                            padding: "8px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: "pointer",
                            whiteSpace: "nowrap", transition: "all 0.2s",
                            background: filter === f ? `${C.water}20` : C.surface,
                            color: filter === f ? C.water : C.textDim,
                            border: `1px solid ${filter === f ? C.water + "40" : C.border}`,
                        }}>{f}</div>
                    ))}
                </div>
            </div>

            {/* Map area */}
            <div style={{
                flex: 1, background: `linear-gradient(170deg, #0B1926 0%, #132840 40%, #0F3D2E 100%)`,
                position: "relative", margin: "0 16px", borderRadius: 20, overflow: "hidden",
                border: `1px solid ${C.border}`, boxShadow: `inset 0 0 40px rgba(0,0,0,0.5)`
            }}>
                {/* Grid lines to mock map texture */}
                {[...Array(6)].map((_, i) => (
                    <div key={`h${i}`} style={{ position: "absolute", top: `${i * 20}%`, left: 0, right: 0, height: 1, background: `${C.water}08` }} />
                ))}
                {[...Array(6)].map((_, i) => (
                    <div key={`v${i}`} style={{ position: "absolute", left: `${i * 20}%`, top: 0, bottom: 0, width: 1, background: `${C.water}08` }} />
                ))}

                {/* Pins */}
                {SPOTS.map((spot, i) => {
                    if (filter !== "Todos" && spot.type !== filter.slice(0, -1) && spot.type !== filter) return null;

                    const positions = [
                        { top: "20%", left: "30%" }, { top: "35%", left: "55%" },
                        { top: "60%", left: "25%" }, { top: "15%", left: "75%" },
                        { top: "70%", left: "65%" }, { top: "45%", left: "45%" },
                    ];
                    const p = positions[i] || { top: "50%", left: "50%" };
                    const isSelected = selectedSpot?.id === spot.id;

                    return (
                        <div key={spot.id} onClick={() => setSelectedSpot(isSelected ? null : spot)} style={{
                            position: "absolute", ...p, transform: "translate(-50%, -100%)", cursor: "pointer",
                            zIndex: isSelected ? 10 : 1, transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        }}>
                            <div style={{
                                width: isSelected ? 36 : 28, height: isSelected ? 36 : 28,
                                borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)",
                                background: spot.type === "Rio" ? C.water : spot.type === "Represa" ? C.blue : C.green,
                                border: `3px solid ${C.text}`, transition: "all 0.3s",
                                boxShadow: isSelected ? `0 0 24px ${C.water}80` : "0 4px 8px rgba(0,0,0,0.3)",
                            }} />
                        </div>
                    );
                })}

                {/* My location */}
                <div style={{ position: "absolute", top: "50%", left: "40%", transform: "translate(-50%, -50%)" }}>
                    <div style={{
                        width: 18, height: 18, borderRadius: 9, background: C.orange,
                        border: `3px solid ${C.text}`, boxShadow: `0 0 16px ${C.orange}`,
                        animation: "pulseGlow 2s infinite"
                    }} />
                </div>

                {/* Add spot FAB */}
                <div style={{
                    position: "absolute", bottom: 16, right: 16, width: 56, height: 56,
                    borderRadius: 28, background: `linear-gradient(135deg, ${C.water}, ${C.waterDark})`, display: "flex",
                    alignItems: "center", justifyContent: "center", cursor: "pointer",
                    boxShadow: `0 8px 24px ${C.water}60`, transition: "transform 0.2s"
                }}
                    onMouseDown={e => e.currentTarget.style.transform = "scale(0.95)"}
                    onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                >
                    <Icon name="plus" size={24} color="#FFF" />
                </div>
            </div>

            {/* Spot detail card */}
            <div style={{
                marginTop: 16, padding: "0 16px",
                height: selectedSpot ? "120px" : "150px", transition: "all 0.3s",
            }}>
                {selectedSpot ? (
                    <div style={{
                        background: C.card, borderRadius: 20, padding: 16,
                        border: `1px solid ${C.border}`, boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
                        animation: "fadeUp 0.3s ease-out"
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{selectedSpot.name}</div>
                                <div style={{ fontSize: 12, color: C.textDim, marginTop: 4 }}>{selectedSpot.type} · {selectedSpot.state}</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 4, background: `${C.amber}15`, padding: "4px 8px", borderRadius: 8 }}>
                                <Icon name="star" size={14} color={C.amber} />
                                <span style={{ fontSize: 13, fontWeight: 800, color: C.amber }}>{selectedSpot.rating}</span>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                            {selectedSpot.species.map(sp => (
                                <span key={sp} style={{
                                    fontSize: 11, padding: "4px 10px", borderRadius: 8,
                                    background: `${C.water}15`, color: C.water, fontWeight: 700, border: `1px solid ${C.water}30`
                                }}>{sp}</span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div style={{ fontSize: 12, color: C.textDim, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
                            Próximos a você
                        </div>
                        {SPOTS.slice(0, 2).map(spot => (
                            <div key={spot.id} onClick={() => setSelectedSpot(spot)} style={{
                                background: C.cardHover, borderRadius: 16, padding: 12, marginBottom: 8,
                                border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between",
                                alignItems: "center", cursor: "pointer", transition: "background 0.2s"
                            }}>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700 }}>{spot.name}</div>
                                    <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{spot.type} · {spot.state}</div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <Icon name="star" size={12} color={C.amber} />
                                    <span style={{ fontSize: 12, color: C.amber, fontWeight: 700 }}>{spot.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
