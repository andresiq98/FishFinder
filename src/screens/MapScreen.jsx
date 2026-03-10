import { useState, useEffect } from 'react';
import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { COLORS as C } from '../theme/colors';
import Icon from '../components/Icon';

export default function MapScreen() {
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [filter, setFilter] = useState("Todos");
    const filters = ["Todos", "Rios", "Represas", "Pesqueiros", "Costão"];

    useEffect(() => {
        const fetchSpots = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "spots"));
                const fetchedSpots = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSpots(fetchedSpots);
            } catch (error) {
                console.error("Error fetching spots:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSpots();
    }, []);

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
                flex: 1,
                position: "relative", margin: "0 16px", borderRadius: 20, overflow: "hidden",
                border: `1px solid ${C.border}`, boxShadow: `0 8px 32px rgba(0,0,0,0.3)`
            }}>
                <Map
                    defaultCenter={{ lat: -15, lng: -50 }}
                    defaultZoom={4}
                    mapId="DEMO_MAP_ID"
                    disableDefaultUI={true}
                    gestureHandling="greedy"
                >
                    {!loading && spots.map((spot) => {
                        if (filter !== "Todos" && spot.type !== filter.slice(0, -1) && spot.type !== filter) return null;

                        const isSelected = selectedSpot?.id === spot.id;

                        // Calculate visual style based on spot type
                        let bg = C.green;
                        if (spot.type === "Rio") bg = C.water;
                        if (spot.type === "Represa") bg = C.blue;

                        return (
                            <AdvancedMarker
                                key={spot.id}
                                position={{ lat: spot.lat, lng: spot.lng }}
                                onClick={() => setSelectedSpot(isSelected ? null : spot)}
                                zIndex={isSelected ? 10 : 1}
                            >
                                <div style={{
                                    width: isSelected ? 36 : 28, height: isSelected ? 36 : 28,
                                    borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)",
                                    background: bg,
                                    border: `3px solid ${C.text}`, transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    boxShadow: isSelected ? `0 0 24px ${C.water}80` : "0 4px 8px rgba(0,0,0,0.3)",
                                    cursor: "pointer"
                                }} />
                            </AdvancedMarker>
                        );
                    })}
                </Map>

                {/* Add spot FAB overlay */}
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
                        {loading && <div style={{ color: C.textDim, fontSize: 14 }}>Carregando pontos de pesca...</div>}
                        {!loading && spots.slice(0, 2).map(spot => (
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
