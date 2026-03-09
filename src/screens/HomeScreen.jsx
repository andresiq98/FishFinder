import { useState, useEffect } from 'react';
import { COLORS as C } from '../theme/colors';
import Icon from '../components/Icon';
import SolunarBar from '../components/SolunarBar';
import { fetchWeatherData, fetchSolunarData, fetchRegulations } from '../services/api';

export default function HomeScreen({ setTab }) {
    const [data, setData] = useState({ weather: null, solunar: null, rules: null });

    useEffect(() => {
        // Simulate data fetching
        Promise.all([
            fetchWeatherData(),
            fetchSolunarData(),
            fetchRegulations()
        ]).then(([weather, solunar, rules]) => {
            setData({ weather, solunar, rules });
        });
    }, []);

    if (!data.rules) return <div style={{ padding: 24, textAlign: 'center', color: C.textDim }}>Carregando dados...</div>;

    const statusConfig = {
        green: { bg: C.greenBg, border: C.green, color: C.green, label: "PESCA LIBERADA", sub: "Todas as espécies nativas permitidas nesta região e data.", icon: "✓" },
        yellow: { bg: C.yellowBg, border: C.yellow, color: C.yellow, label: "RESTRIÇÕES ATIVAS", sub: "Defeso parcial: apenas espécies exóticas permitidas.", icon: "!" },
        red: { bg: C.redBg, border: C.red, color: C.red, label: "DEFESO TOTAL", sub: "Pesca proibida neste período e região.", icon: "✕" },
    };
    const s = statusConfig[data.rules.status] || statusConfig.green;

    return (
        <div style={{ padding: "16px 16px 100px 16px", animation: "fadeUp 0.5s ease-out" }}>
            {/* Location bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon name="pin" size={16} color={C.water} />
                    <span style={{ fontSize: 14, color: C.textMid, fontWeight: 700, fontFamily: C.fontHeading }}>Represa de Jurumirim, SP</span>
                </div>
                <span style={{ fontSize: 12, color: C.textDim, fontWeight: 500 }}>09 Mar 2026</span>
            </div>

            {/* STATUS SEMÁFORO */}
            <div style={{
                background: s.bg, border: `1px solid ${s.border}40`, borderRadius: 20,
                padding: 20, marginBottom: 16, position: "relative", overflow: "hidden",
                boxShadow: `0 8px 32px ${s.border}15`
            }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: s.border }} />
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{
                        width: 52, height: 52, borderRadius: 26, background: `${s.border}25`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: `2px solid ${s.border}`, fontSize: 24, fontWeight: 900, color: s.color,
                        boxShadow: `0 0 20px ${s.border}40`
                    }}>
                        {s.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 18, fontWeight: 800, color: s.color, letterSpacing: 0.5, fontFamily: 'Outfit, sans-serif' }}>{s.label}</div>
                        <div style={{ fontSize: 12, color: C.textMid, marginTop: 4, lineHeight: 1.5 }}>{s.sub}</div>
                    </div>
                </div>
                <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {data.rules.allowedSpecies.map(r => (
                        <span key={r} style={{
                            fontSize: 10, padding: "4px 10px", borderRadius: 8,
                            background: `${C.green}15`, color: C.green, fontWeight: 600, border: `1px solid ${C.green}30`,
                        }}>{r}</span>
                    ))}
                </div>
            </div>

            {/* ÍNDICE SOLUNAR */}
            <div style={{
                background: C.card, borderRadius: 20, padding: 20, marginBottom: 16,
                border: `1px solid ${C.border}`, boxShadow: `0 4px 20px rgba(0,0,0,0.2)`
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Icon name="sun" size={18} color={C.amber} />
                        <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Índice de Pesca Hoje</span>
                    </div>
                    <div style={{
                        fontSize: 28, fontWeight: 900, fontFamily: 'Outfit, sans-serif',
                        background: `linear-gradient(135deg, ${C.green}, ${C.amber})`,
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        textShadow: `0 0 20px ${C.amber}40`
                    }}>
                        {data.solunar.rating}
                    </div>
                </div>
                <SolunarBar hours={data.solunar.hours} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 11, color: C.textDim }}>
                        <span style={{ color: C.green, fontWeight: 700 }}>●</span> Maior: 06:20–08:10
                    </div>
                    <div style={{ fontSize: 11, color: C.textDim }}>
                        <span style={{ color: C.amber, fontWeight: 700 }}>●</span> Menor: 17:00–18:30
                    </div>
                </div>
            </div>

            {/* CLIMA */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                {[
                    { icon: "sun", label: "Temp", value: `${data.weather.temp}°C`, color: C.orange },
                    { icon: "wind", label: "Vento", value: data.weather.wind, color: C.blue },
                    { icon: "moon", label: "Lua", value: data.weather.moon, color: C.amber },
                ].map(w => (
                    <div key={w.label} style={{
                        background: C.card, borderRadius: 16, padding: "16px 10px",
                        border: `1px solid ${C.border}`, textAlign: "center",
                        boxShadow: `0 4px 12px rgba(0,0,0,0.15)`
                    }}>
                        <Icon name={w.icon} size={20} color={w.color} />
                        <div style={{ fontSize: 15, fontWeight: 800, marginTop: 8, color: C.text }}>{w.value}</div>
                        <div style={{ fontSize: 10, color: C.textDim, marginTop: 4, fontWeight: 500 }}>{w.label}</div>
                    </div>
                ))}
            </div>

            {/* ÚLTIMA CAPTURA */}
            <div
                onClick={() => setTab?.(4)}
                style={{
                    background: C.cardHover, borderRadius: 20, padding: 16, border: `1px solid ${C.border}`,
                    marginBottom: 16, cursor: 'pointer', transition: 'all 0.2s',
                }}>
                <div style={{ fontSize: 11, color: C.textDim, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
                    Última Captura
                </div>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{
                        width: 60, height: 60, borderRadius: 16, background: `${C.water}15`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32,
                        border: `1px solid ${C.water}30`,
                    }}>🐟</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Tucunaré-açu</div>
                        <div style={{ fontSize: 12, color: C.textMid, marginTop: 4 }}>4.2 kg · 52 cm · Rio Negro</div>
                        <div style={{ fontSize: 11, color: C.textDim, marginTop: 4 }}>Há 2 dias · Solunar: 87</div>
                    </div>
                    <Icon name="chevron" size={20} color={C.textDim} />
                </div>
            </div>

            {/* TIP DO DIA */}
            <div style={{
                background: `linear-gradient(135deg, ${C.blueDim}40, ${C.card})`,
                borderRadius: 20, padding: 20, border: `1px solid ${C.blue}30`,
                boxShadow: `0 8px 24px ${C.blue}15`
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 18 }}>💡</span>
                    <div style={{ fontSize: 13, color: C.blue, fontWeight: 800, letterSpacing: 0.5 }}>DICA DO DIA</div>
                </div>
                <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>
                    Lua nova + pressão subindo = atividade intensa de tucunarés nas primeiras horas da manhã. Aposte em iscas de superfície!
                </div>
            </div>
        </div>
    );
}
