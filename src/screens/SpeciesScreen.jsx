import { useState } from 'react';
import { COLORS as C } from '../theme/colors';
import Icon from '../components/Icon';
import { SPECIES } from '../data/mockData';

export default function SpeciesScreen() {
    const [search, setSearch] = useState("");
    const [detail, setDetail] = useState(null);
    const [typeFilter, setTypeFilter] = useState("Todas");

    const filtered = SPECIES.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) &&
        (typeFilter === "Todas" || (typeFilter === "Água doce" && s.type === "Água doce") || (typeFilter === "Salgada" && s.type !== "Água doce") || (typeFilter === "Exótica" && s.origin === "Exótica"))
    );

    if (detail) return (
        <div style={{ padding: "16px 16px 100px 16px", animation: "fadeUp 0.3s ease-out" }}>
            <div onClick={() => setDetail(null)} style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: 20, cursor: "pointer",
                padding: "8px 0"
            }}>
                <Icon name="back" size={20} color={C.textMid} />
                <span style={{ fontSize: 14, color: C.textMid, fontWeight: 600 }}>Voltar às Espécies</span>
            </div>

            <div style={{
                height: 180, background: `linear-gradient(135deg, ${C.blueDim}40, ${C.card})`,
                borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 80, marginBottom: 20, border: `1px solid ${C.blue}20`,
                boxShadow: `0 12px 40px rgba(0,0,0,0.3)`
            }}>
                <span style={{ animation: "float 4s ease-in-out infinite" }}>{detail.img}</span>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <span style={{
                    fontSize: 11, padding: "6px 14px", borderRadius: 12, fontWeight: 700,
                    background: detail.origin === "Nativa" ? `${C.green}15` : `${C.amber}15`,
                    color: detail.origin === "Nativa" ? C.green : C.amber,
                    boxShadow: `0 4px 12px rgba(0,0,0,0.1)`
                }}>{detail.origin}</span>
                <span style={{
                    fontSize: 11, padding: "6px 14px", borderRadius: 12, fontWeight: 700,
                    background: `${C.water}15`, color: C.water,
                    boxShadow: `0 4px 12px rgba(0,0,0,0.1)`
                }}>{detail.type}</span>
            </div>

            <div style={{ fontSize: 28, fontWeight: 900, fontFamily: 'Outfit, sans-serif' }}>{detail.name}</div>
            <div style={{ fontSize: 14, color: C.textDim, fontStyle: "italic", marginBottom: 24, marginTop: 4 }}>{detail.sci}</div>

            <div style={{ display: "grid", gap: 12 }}>
                {[
                    { title: "Habitat", content: detail.habitat, icon: "map" },
                    { title: "Melhores iscas", content: detail.iscas, icon: "star" },
                    { title: "Técnicas", content: detail.techniques, icon: "target" },
                    { title: "Temporada", content: detail.season, icon: "sun" },
                    { title: "Curiosidade", content: detail.curiosity, icon: "search" },
                ].map(section => (
                    <div key={section.title} style={{
                        background: C.cardHover, borderRadius: 16, padding: "16px 20px",
                        border: `1px solid ${C.border}`,
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <Icon name={section.icon} size={16} color={C.water} />
                            <div style={{ fontSize: 13, fontWeight: 800, color: C.water, textTransform: "uppercase", letterSpacing: 0.5 }}>
                                {section.title}
                            </div>
                        </div>
                        <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.6 }}>{section.content}</div>
                    </div>
                ))}
            </div>

            {detail.min > 0 && (
                <div style={{
                    background: C.yellowBg, borderRadius: 16, padding: "20px", marginTop: 12,
                    border: `1px solid ${C.yellow}30`, display: "flex", alignItems: "center", gap: 16
                }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: C.yellow, marginBottom: 4, textTransform: "uppercase" }}>Tamanho mínimo</div>
                        <div style={{ fontSize: 28, fontWeight: 900, color: C.yellow, fontFamily: 'Outfit, sans-serif' }}>{detail.min} cm</div>
                        <div style={{ fontSize: 11, color: `${C.yellow}90`, marginTop: 6, lineHeight: 1.4 }}>
                            Regulamentação estadual sujeita a alterações. Consulte a tela inicial.
                        </div>
                    </div>
                    <Icon name="check" size={32} color={C.yellow} />
                </div>
            )}
        </div>
    );

    return (
        <div style={{ padding: "0 16px 100px 16px", animation: "fadeUp 0.4s ease-out" }}>
            <div style={{ padding: "16px 0 12px" }}>
                <h1 style={{ fontSize: 24, fontWeight: 900, fontFamily: 'Outfit, sans-serif', color: C.text }}>Guia de Espécies</h1>
                <p style={{ fontSize: 13, color: C.textDim, marginTop: 4 }}>Conheça os peixes da pesca esportiva brasileira.</p>
            </div>

            <div style={{
                background: C.surface, borderRadius: 16, padding: "14px 18px",
                display: "flex", alignItems: "center", gap: 12, border: `1px solid ${C.border}`, marginBottom: 16,
                boxShadow: `0 4px 16px rgba(0,0,0,0.15)`
            }}>
                <Icon name="search" size={20} color={C.textDim} />
                <input
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar tucunaré, dourado..."
                    style={{
                        background: "none", border: "none", outline: "none", color: C.text,
                        fontSize: 15, width: "100%", fontFamily: "inherit"
                    }}
                />
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
                {["Todas", "Água doce", "Salgada", "Exótica"].map(f => (
                    <div key={f} onClick={() => setTypeFilter(f)} style={{
                        padding: "8px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: "pointer",
                        whiteSpace: "nowrap", transition: "all 0.2s",
                        background: typeFilter === f ? `${C.water}20` : C.surface,
                        color: typeFilter === f ? C.water : C.textDim,
                        border: `1px solid ${typeFilter === f ? C.water + "40" : C.border}`,
                    }}>{f}</div>
                ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filtered.map(sp => (
                    <div key={sp.id} onClick={() => setDetail(sp)} style={{
                        background: C.card, borderRadius: 16, padding: "16px", border: `1px solid ${C.border}`,
                        display: "flex", alignItems: "center", gap: 16, cursor: "pointer", transition: "transform 0.2s",
                        boxShadow: `0 4px 12px rgba(0,0,0,0.1)`
                    }}
                        onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
                        onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <div style={{
                            width: 56, height: 56, borderRadius: 16, fontSize: 32,
                            background: `linear-gradient(135deg, ${C.water}20, ${C.surface})`, border: `1px solid ${C.water}30`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: `inset 0 0 10px rgba(0,0,0,0.2)`
                        }}>{sp.img}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{sp.name}</div>
                            <div style={{ fontSize: 12, color: C.textDim, fontStyle: "italic", marginTop: 2 }}>{sp.sci}</div>
                            <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                                <span style={{
                                    fontSize: 10, padding: "3px 8px", borderRadius: 6, fontWeight: 600,
                                    background: sp.origin === "Nativa" ? `${C.green}15` : `${C.amber}15`,
                                    color: sp.origin === "Nativa" ? C.green : C.amber,
                                }}>{sp.origin}</span>
                                <span style={{
                                    fontSize: 10, padding: "3px 8px", borderRadius: 6, fontWeight: 600,
                                    background: `${C.blue}15`, color: C.blue,
                                }}>{sp.type}</span>
                            </div>
                        </div>
                        <Icon name="chevron" size={18} color={C.textDim} />
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div style={{ padding: 40, textAlign: 'center', color: C.textDim }}>
                        Nenhuma espécie encontrada.
                    </div>
                )}
            </div>
        </div>
    );
}
