import { COLORS as C } from '../theme/colors';

export default function SolunarBar({ hours }) {
    return (
        <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 48 }}>
            {hours.map((h, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                    <div style={{
                        width: "100%", minWidth: 4, borderRadius: 2,
                        height: Math.max(4, h.value * 0.42),
                        background: h.value > 75 ? C.green : h.value > 50 ? C.amber : h.value > 25 ? C.orange : C.red,
                        opacity: h.active ? 1 : 0.4,
                        transition: "all 0.3s",
                        boxShadow: h.active && h.value > 75 ? `0 0 12px ${C.green}40` : 'none'
                    }} />
                    <span style={{ fontSize: 8, color: C.textDim, marginTop: 4, fontWeight: 500 }}>{h.label}</span>
                </div>
            ))}
        </div>
    );
}
