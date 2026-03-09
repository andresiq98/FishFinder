export const SPECIES = [
    { id: 1, name: "Tucunaré-açu", sci: "Cichla temensis", type: "Água doce", origin: "Nativa", min: 35, img: "🐟", habitat: "Rios e lagos de águas claras da bacia amazônica", iscas: "Iscas artificiais de superfície, hélices, poppers, sticks", techniques: "Arremesso com carretilha, trabalho de superfície ao amanhecer", season: "Mai–Out (seca)", curiosity: "Pode ultrapassar 12kg. O macho desenvolve uma protuberância na cabeça durante a reprodução." },
    { id: 2, name: "Dourado", sci: "Salminus brasiliensis", type: "Água doce", origin: "Nativa", min: 55, img: "✨", habitat: "Rios com correnteza da bacia do Paraná e Paraguai", iscas: "Colheres, spinners, iscas de meia-água", techniques: "Corrico e arremesso em corredeiras", season: "Mar–Out", curiosity: "Conhecido como 'rei do rio'. Salta até 2m fora d'água quando fisgado." },
    { id: 3, name: "Robalo-flecha", sci: "Centropomus undecimalis", type: "Salgada/Estuário", origin: "Nativa", min: 40, img: "🎯", habitat: "Estuários, manguezais, desembocaduras de rios", iscas: "Jigs, shads, camarão artificial", techniques: "Light tackle em estruturas submersas", season: "Ano todo (pico Nov–Mar)", curiosity: "Hermafrodita protândrico — nasce macho e vira fêmea ao longo da vida." },
    { id: 4, name: "Pintado", sci: "Pseudoplatystoma corruscans", type: "Água doce", origin: "Nativa", min: 80, img: "🐆", habitat: "Rios de grande porte, poços profundos", iscas: "Iscas naturais (lambari, tuvira), jigs pesados", techniques: "Pesca de fundo com chumbada, à noite", season: "Fev–Out", curiosity: "Maior bagre esportivo do Brasil. Pode passar de 100kg em rios preservados." },
    { id: 5, name: "Traíra", sci: "Hoplias malabaricus", type: "Água doce", origin: "Nativa", min: 25, img: "🦷", habitat: "Lagoas, brejos, remansos com vegetação", iscas: "Sapos artificiais, spinners, iscas de superfície", techniques: "Arremesso em meio à vegetação aquática", season: "Ano todo", curiosity: "Predadora voraz e extremamente resistente. Sobrevive em água com pouco oxigênio." },
    { id: 6, name: "Tilápia", sci: "Oreochromis niloticus", type: "Água doce", origin: "Exótica", min: 0, img: "🔵", habitat: "Represas, lagos e tanques de piscicultura", iscas: "Massa, minhoca, ração, pequenos jigs", techniques: "Pesca de fundo com boia, vara telescópica", season: "Ano todo (melhor no calor)", curiosity: "Espécie exótica — pode ser pescada inclusive durante o defeso." },
    { id: 7, name: "Pacu", sci: "Piaractus mesopotamicus", type: "Água doce", origin: "Nativa", min: 40, img: "🍃", habitat: "Rios com mata ciliar, remansos", iscas: "Frutas (goiaba, coquinho), massa, minhoca", techniques: "Pesca de espera com boia, ceva com frutas", season: "Set–Mar", curiosity: "Alimentação frugívora — come frutas que caem das árvores nas margens." },
    { id: 8, name: "Pirarucu", sci: "Arapaima gigas", type: "Água doce", origin: "Nativa", min: 150, img: "👑", habitat: "Lagos e rios de várzea amazônicos", iscas: "Iscas artificiais grandes, swimbaits", techniques: "Fly fishing, arremesso pesado", season: "Jun–Nov (seca)", curiosity: "Maior peixe de escamas de água doce do mundo. Pode ultrapassar 200kg e 3m." },
];

export const SPOTS = [
    { id: 1, name: "Represa de Jurumirim", type: "Represa", state: "SP", species: ["Tucunaré", "Tilápia", "Traíra"], rating: 4.5, lat: -23.2, lng: -49.3 },
    { id: 2, name: "Rio Araguaia – Luís Alves", type: "Rio", state: "GO/MT", species: ["Tucunaré", "Pintado", "Pacu"], rating: 4.8, lat: -12.8, lng: -50.6 },
    { id: 3, name: "Pesqueiro Tô Atoa", type: "Pesqueiro", state: "SP", species: ["Tilápia", "Pacu", "Tambaqui"], rating: 4.2, lat: -23.5, lng: -46.8 },
    { id: 4, name: "Rio Negro – Barcelos", type: "Rio", state: "AM", species: ["Tucunaré-açu", "Pirarucu"], rating: 4.9, lat: -0.97, lng: -62.9 },
    { id: 5, name: "Represa de Três Marias", type: "Represa", state: "MG", species: ["Dourado", "Surubim", "Pirá"], rating: 4.4, lat: -18.2, lng: -45.2 },
    { id: 6, name: "Pantanal – Miranda", type: "Rio", state: "MS", species: ["Dourado", "Pintado", "Pacu"], rating: 4.7, lat: -20.2, lng: -56.4 },
];

export const CATCHES = [
    { id: 1, species: "Tucunaré-açu", weight: 4.2, length: 52, date: "07/03/2026", time: "06:42", temp: 28, pressure: 1013, wind: 8, moon: "Nova", spot: "Rio Negro", img: "🐟", solunar: 87 },
    { id: 2, species: "Traíra", weight: 1.8, length: 35, date: "02/03/2026", time: "17:15", temp: 31, pressure: 1008, wind: 12, moon: "Crescente", spot: "Jurumirim", img: "🦷", solunar: 62 },
    { id: 3, species: "Tilápia", weight: 0.9, length: 28, date: "25/02/2026", time: "10:30", temp: 33, pressure: 1015, wind: 5, moon: "Cheia", spot: "Pesqueiro Tô Atoa", img: "🔵", solunar: 45 },
];
