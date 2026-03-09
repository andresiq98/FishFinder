import { motion } from 'framer-motion';
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
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
                display: "flex", justifyContent: "space-around", alignItems: "center",
                padding: "12px 0 24px", background: C.surface,
                borderTop: `1px solid ${C.border}`,
                position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
                maxWidth: 480, margin: '0 auto'
            }}
        >
            {items.map((item, i) => {
                const isActive = i === active;
                return (
                    <motion.div
                        key={i}
                        onClick={() => onChange?.(i)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                            opacity: isActive ? 1 : 0.45,
                            cursor: "pointer",
                        }}
                    >
                        <motion.div
                            animate={{ y: isActive ? -4 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                            <Icon name={item.icon} size={22} color={isActive ? C.amber : C.textMid} />
                        </motion.div>
                        <span style={{
                            fontSize: 10,
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? C.amber : C.textDim,
                            letterSpacing: "0.02em",
                        }}>{item.label}</span>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
