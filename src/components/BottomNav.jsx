import { COLORS as C } from '../theme/colors';
import Icon from './Icon';

export default function BottomNav({ active = 0, onChange }) {
    const items = [
        { icon: "home", label: "Início" },
        { icon: "camera", label: "Capturar" },
        { icon: "map", label: "Mapa" },
        { icon: "fish", label: "Espécies" },
        { icon: "user", label: "Perfil" },
    ];
    return (
        <div style={{
            display: "flex", justifyContent: "space-around", alignItems: "center",
            padding: "12px 0 24px", background: C.surface,
            borderTop: `1px solid ${C.border}`,
            position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
            maxWidth: 480, margin: '0 auto'
        }}>
            {items.map((item, i) => {
                const isActive = i === active;
                return (
                    <div key={i} onClick={() => onChange?.(i)} style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                        opacity: isActive ? 1 : 0.45,
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                        transform: isActive ? "translateY(-4px)" : "none"
                    }}>
                        <Icon name={item.icon} size={22} color={isActive ? C.amber : C.textMid} />
                        <span style={{
                            fontSize: 10,
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? C.amber : C.textDim,
                            letterSpacing: "0.02em",
                        }}>{item.label}</span>
                    </div>
                );
            })}
        </div>
    );
}
