import { useState, useEffect } from 'react';
import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { COLORS as C } from '../theme/colors';
import Icon from '../components/Icon';

const TYPE_COLORS = {
    "Pesqueiro": "#4CAF50",
    "Represa": "#2196F3",
    "Rio": "#00BCD4",
    "Costão": "#FF9800",
};

const TYPE_EMOJI = {
    "Pesqueiro": "🎣",
    "Represa": "💧",
    "Rio": "🌊",
    "Costão": "⚓",
};

function StarRow({ rating, reviewCount }) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex", gap: 2 }}>
                {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} style={{
                        fontSize: 12,
                        color: i <= full ? C.amber : (i === full + 1 && half ? C.amber : `${C.amber}30`)
                    }}>★</span>
                ))}
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: C.amber }}>{rating.toFixed(1)}</span>
            {reviewCount && (
                <span style={{ fontSize: 11, color: C.textDim }}>({reviewCount.toLocaleString('pt-BR')} avaliações)</span>
            )}
        </div>
    );
}

export default function MapScreen() {
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [filter, setFilter] = useState("Todos");
    const [search, setSearch] = useState("");
    const [showDetail, setShowDetail] = useState(false);

    const filters = ["Todos", "Pesqueiro", "Represa", "Rio", "Costão"];

    useEffect(() => {
        const fetchSpots = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "spots"));
                const fetchedSpots = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Sort by rating descending
                fetchedSpots.sort((a, b) => b.rating - a.rating);
                setSpots(fetchedSpots);
            } catch (error) {
                console.error("Error fetching spots:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSpots();
    }, []);

    const filtered = spots.filter(s =>
        (filter === "Todos" || s.type === filter) &&
        (search === "" || s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.address?.toLowerCase().includes(search.toLowerCase()) ||
            s.species?.some(sp => sp.toLowerCase().includes(search.toLowerCase())))
    );

    const handleMarkerClick = (spot) => {
        if (selectedSpot?.id === spot.id) {
            setShowDetail(d => !d);
        } else {
            setSelectedSpot(spot);
            setShowDetail(true);
        }
    };

    const openGoogleMaps = (spot) => {
        const q = spot.googleMapsUrl || `https://maps.google.com/?q=${spot.lat},${spot.lng}`;
        window.open(q, '_blank');
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", paddingBottom: 80, animation: "fadeUp 0.4s ease-out" }}>

            {/* Search + filters */}
            <div style={{ padding: "16px 16px 0", zIndex: 10 }}>
                <div style={{ marginBottom: 8 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 900, fontFamily: 'Outfit, sans-serif', margin: 0 }}>Mapa de Pesca</h2>
                    <p style={{ fontSize: 12, color: C.textDim, margin: "2px 0 0" }}>
                        {loading ? "Carregando..." : `${filtered.length} spots em São Paulo`}
                    </p>
                </div>

                <div style={{
                    background: C.surface, borderRadius: 12, padding: "11px 16px",
                    display: "flex", alignItems: "center", gap: 10, border: `1px solid ${C.border}`, marginBottom: 10,
                    boxShadow: `0 4px 12px rgba(0,0,0,0.2)`
                }}>
                    <Icon name="search" size={18} color={C.textDim} />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar pesqueiro, rio, espécie..."
                        style={{
                            background: 'transparent', border: 'none', color: C.text, fontSize: 14,
                            width: '100%', outline: 'none', fontFamily: 'inherit'
                        }}
                    />
                    {search && (
                        <span onClick={() => setSearch("")} style={{ cursor: "pointer", color: C.textDim, fontSize: 18, lineHeight: 1 }}>×</span>
                    )}
                </div>

                <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
                    {filters.map(f => (
                        <div key={f} onClick={() => setFilter(f)} style={{
                            padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: "pointer",
                            whiteSpace: "nowrap", transition: "all 0.2s",
                            background: filter === f ? `${TYPE_COLORS[f] || C.water}20` : C.surface,
                            color: filter === f ? (TYPE_COLORS[f] || C.water) : C.textDim,
                            border: `1px solid ${filter === f ? (TYPE_COLORS[f] || C.water) + "50" : C.border}`,
                            display: "flex", alignItems: "center", gap: 5
                        }}>
                            {f !== "Todos" && <span>{TYPE_EMOJI[f]}</span>}
                            {f}
                        </div>
                    ))}
                </div>
            </div>

            {/* Map area */}
            <div style={{
                flex: 1,
                position: "relative", margin: "0 16px", borderRadius: 20, overflow: "hidden",
                border: `1px solid ${C.border}`, boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
                minHeight: 220
            }}>
                <Map
                    defaultCenter={{ lat: -22.8, lng: -48.0 }}
                    defaultZoom={7}
                    mapId="DEMO_MAP_ID"
                    disableDefaultUI={true}
                    gestureHandling="greedy"
                    onClick={() => { setSelectedSpot(null); setShowDetail(false); }}
                >
                    {!loading && filtered.map((spot) => {
                        const isSelected = selectedSpot?.id === spot.id;
                        const color = TYPE_COLORS[spot.type] || C.green;

                        return (
                            <AdvancedMarker
                                key={spot.id}
                                position={{ lat: spot.lat, lng: spot.lng }}
                                onClick={() => handleMarkerClick(spot)}
                                zIndex={isSelected ? 10 : 1}
                            >
                                <div style={{
                                    display: "flex", flexDirection: "column", alignItems: "center",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    transform: isSelected ? "scale(1.3)" : "scale(1)",
                                }}>
                                    {isSelected && (
                                        <div style={{
                                            background: C.card, borderRadius: 8, padding: "3px 8px",
                                            fontSize: 10, fontWeight: 800, color: C.text, whiteSpace: "nowrap",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.4)", marginBottom: 4,
                                            border: `1px solid ${color}50`
                                        }}>
                                            {spot.name.length > 18 ? spot.name.slice(0, 18) + "…" : spot.name}
                                        </div>
                                    )}
                                    <div style={{
                                        width: isSelected ? 32 : 24, height: isSelected ? 32 : 24,
                                        borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)",
                                        background: color,
                                        border: `2px solid white`,
                                        boxShadow: isSelected ? `0 0 20px ${color}80` : "0 3px 8px rgba(0,0,0,0.35)",
                                        cursor: "pointer",
                                        display: "flex", alignItems: "center", justifyContent: "center"
                                    }}>
                                        <span style={{ transform: "rotate(45deg)", fontSize: isSelected ? 14 : 10 }}>
                                            {TYPE_EMOJI[spot.type] || "📍"}
                                        </span>
                                    </div>
                                </div>
                            </AdvancedMarker>
                        );
                    })}
                </Map>

                {/* Legend */}
                <div style={{
                    position: "absolute", top: 12, left: 12, background: `${C.card}EE`,
                    borderRadius: 10, padding: "8px 10px", backdropFilter: "blur(8px)",
                    border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 4
                }}>
                    {Object.entries(TYPE_EMOJI).map(([type, emoji]) => (
                        <div key={type} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: TYPE_COLORS[type] }} />
                            <span style={{ fontSize: 10, color: C.textMid, fontWeight: 600 }}>{emoji} {type}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom panel — spot detail or list */}
            <div style={{ padding: "12px 16px 0", maxHeight: showDetail && selectedSpot ? 280 : 160, overflow: "hidden", transition: "max-height 0.3s ease" }}>
                {selectedSpot && showDetail ? (
                    <div style={{
                        background: C.card, borderRadius: 20, padding: 16,
                        border: `1px solid ${TYPE_COLORS[selectedSpot.type]}30`,
                        boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
                        animation: "fadeUp 0.3s ease-out",
                        overflowY: "auto", maxHeight: 260
                    }}>
                        {/* Header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                            <div style={{ flex: 1, paddingRight: 8 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                                    <span style={{
                                        fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6,
                                        background: `${TYPE_COLORS[selectedSpot.type]}20`,
                                        color: TYPE_COLORS[selectedSpot.type]
                                    }}>{TYPE_EMOJI[selectedSpot.type]} {selectedSpot.type}</span>
                                </div>
                                <div style={{ fontSize: 16, fontWeight: 900, fontFamily: 'Outfit, sans-serif', lineHeight: 1.2 }}>
                                    {selectedSpot.name}
                                </div>
                                <div style={{ fontSize: 11, color: C.textDim, marginTop: 3 }}>
                                    📍 {selectedSpot.address} · {selectedSpot.distance}
                                </div>
                                <div style={{ marginTop: 6 }}>
                                    <StarRow rating={selectedSpot.rating} reviewCount={selectedSpot.reviewCount} />
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDetail(false)}
                                style={{ background: "none", border: "none", color: C.textDim, fontSize: 20, cursor: "pointer", lineHeight: 1, padding: 4 }}
                            >×</button>
                        </div>

                        {/* Description */}
                        <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5, margin: "8px 0" }}>
                            {selectedSpot.description}
                        </p>

                        {/* Species tags */}
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                            {selectedSpot.species?.map(sp => (
                                <span key={sp} style={{
                                    fontSize: 10, padding: "3px 9px", borderRadius: 8, fontWeight: 700,
                                    background: `${C.water}15`, color: C.water, border: `1px solid ${C.water}30`
                                }}>🐟 {sp}</span>
                            ))}
                        </div>

                        {/* Info grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                            {selectedSpot.preco && (
                                <div style={{ background: C.surface, borderRadius: 10, padding: "8px 10px", border: `1px solid ${C.border}` }}>
                                    <div style={{ fontSize: 9, fontWeight: 800, color: C.water, textTransform: "uppercase", marginBottom: 2 }}>💰 Preço</div>
                                    <div style={{ fontSize: 11, color: C.textMid }}>{selectedSpot.preco}</div>
                                </div>
                            )}
                            {selectedSpot.regras && (
                                <div style={{ background: C.surface, borderRadius: 10, padding: "8px 10px", border: `1px solid ${C.border}` }}>
                                    <div style={{ fontSize: 9, fontWeight: 800, color: C.amber, textTransform: "uppercase", marginBottom: 2 }}>⚠️ Regras</div>
                                    <div style={{ fontSize: 11, color: C.textMid, lineHeight: 1.4 }}>{selectedSpot.regras}</div>
                                </div>
                            )}
                        </div>

                        {selectedSpot.dicas && (
                            <div style={{ background: `${C.green}10`, borderRadius: 10, padding: "10px 12px", marginBottom: 10, border: `1px solid ${C.green}20` }}>
                                <div style={{ fontSize: 9, fontWeight: 800, color: C.green, textTransform: "uppercase", marginBottom: 4 }}>💡 Dica do local</div>
                                <div style={{ fontSize: 11, color: C.textMid, lineHeight: 1.5 }}>{selectedSpot.dicas}</div>
                            </div>
                        )}

                        {/* Google Maps button */}
                        <button
                            onClick={() => openGoogleMaps(selectedSpot)}
                            style={{
                                width: "100%", padding: "12px", borderRadius: 12, border: "none", cursor: "pointer",
                                background: `linear-gradient(135deg, ${C.water}, ${C.waterDark})`,
                                color: "white", fontWeight: 800, fontSize: 13, fontFamily: 'Outfit, sans-serif',
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                boxShadow: `0 4px 16px ${C.water}40`
                            }}
                        >
                            <Icon name="map" size={16} color="white" />
                            Abrir no Google Maps
                        </button>
                    </div>
                ) : (
                    /* List of top spots */
                    <div>
                        <div style={{ fontSize: 11, color: C.textDim, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>
                            {filter === "Todos" ? "⭐ Melhores avaliados" : `${TYPE_EMOJI[filter]} ${filter} em SP`}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {loading
                                ? <div style={{ color: C.textDim, fontSize: 13 }}>Carregando pontos de pesca...</div>
                                : filtered.slice(0, 3).map(spot => (
                                    <div key={spot.id} onClick={() => handleMarkerClick(spot)} style={{
                                        background: C.cardHover, borderRadius: 14, padding: "10px 14px",
                                        border: `1px solid ${C.border}`, display: "flex", alignItems: "center",
                                        justifyContent: "space-between", cursor: "pointer",
                                        borderLeft: `3px solid ${TYPE_COLORS[spot.type] || C.water}`
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 13, fontWeight: 800 }}>{TYPE_EMOJI[spot.type]} {spot.name}</div>
                                            <div style={{ fontSize: 10, color: C.textDim, marginTop: 1 }}>{spot.address} · {spot.distance}</div>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 3, marginLeft: 8 }}>
                                            <span style={{ fontSize: 12, color: C.amber }}>★</span>
                                            <span style={{ fontSize: 12, color: C.amber, fontWeight: 800 }}>{spot.rating.toFixed(1)}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
