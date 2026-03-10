/**
 * fixPhotos.js — busca URLs reais de imagem via Wikipedia API e atualiza Firestore
 * Usa a API de pageimages do Wikipedia: retorna a imagem principal da página com qualidade real.
 */
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mapeamento: docId -> título da página Wikipedia (inglês/português mais preciso)
const SPECIES = [
    { id: "cichla_temensis", wiki: "Cichla temensis" },
    { id: "salminus_brasiliensis", wiki: "Salminus brasiliensis" },
    { id: "centropomus_undecimalis", wiki: "Centropomus undecimalis" },
    { id: "pseudoplatystoma_corruscans", wiki: "Pseudoplatystoma corruscans" },
    { id: "arapaima_gigas", wiki: "Arapaima gigas" },
    { id: "colossoma_macropomum", wiki: "Colossoma macropomum" },
    { id: "piaractus_mesopotamicus", wiki: "Piaractus mesopotamicus" },
    { id: "brachyplatystoma_filamentosum", wiki: "Brachyplatystoma filamentosum" },
    { id: "zungaro_jahu", wiki: "Zungaro jahu" },
    { id: "hydrolycus_scomberoides", wiki: "Hydrolycus scomberoides" },
    { id: "hoplias_malabaricus", wiki: "Hoplias malabaricus" },
    { id: "brycon_amazonicus", wiki: "Brycon amazonicus" },
    { id: "pseudoplatystoma_tigrinum", wiki: "Pseudoplatystoma tigrinum" },
    { id: "boulengerella_cuvieri", wiki: "Boulengerella cuvieri" },
    { id: "plagioscion_squamosissimus", wiki: "Plagioscion squamosissimus" },
    { id: "cichla_piquiti", wiki: "Cichla piquiti" },
    { id: "brycon_hilarii", wiki: "Brycon hilarii" },
    { id: "pellona_castelnaeana", wiki: "Pellona castelnaeana" },
    { id: "megaleporinus_macrocephalus", wiki: "Megaleporinus macrocephalus" },
    { id: "cichla_pinima", wiki: "Cichla pinima" },
];

// Fallbacks manuais para espécies que podem não ter página própria com imagem
const MANUAL_OVERRIDES = {
    "zungaro_jahu": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Zungaro_jahu_-_Zoo_No_Guara_-_SP_-_Brasil.jpg/1280px-Zungaro_jahu_-_Zoo_No_Guara_-_SP_-_Brasil.jpg",
    "hydrolycus_scomberoides": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hydrolycus_scomberoides.jpg/1280px-Hydrolycus_scomberoides.jpg",
    "boulengerella_cuvieri": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Boulengerella_cuvieri_SI2.jpg/1280px-Boulengerella_cuvieri_SI2.jpg",
    "pellona_castelnaeana": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Pellona_castelnaeana_Bleeker.jpg/1280px-Pellona_castelnaeana_Bleeker.jpg",
    "megaleporinus_macrocephalus": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Leporinus_macrocephalus.jpg/1280px-Leporinus_macrocephalus.jpg",
    "cichla_pinima": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Cichla_pinima_fish.jpg/1280px-Cichla_pinima_fish.jpg",
    "brycon_hilarii": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Brycon_hilarii_1.jpg/1280px-Brycon_hilarii_1.jpg",
};

async function getWikipediaImageUrl(title) {
    const encoded = encodeURIComponent(title);
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encoded}&prop=pageimages&format=json&pithumbsize=1200&formatversion=2`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const pages = json.query?.pages;
        if (!pages || !pages.length) return null;
        const page = pages[0];
        return page.thumbnail?.source || null;
    } catch (e) {
        console.error(`  ⚠️  Erro buscando "${title}":`, e.message);
        return null;
    }
}

async function run() {
    console.log("🔍 Buscando imagens reais via Wikipedia API...\n");

    for (const sp of SPECIES) {
        process.stdout.write(`📷 ${sp.id}... `);

        let imageUrl = MANUAL_OVERRIDES[sp.id] || null;
        let source = imageUrl ? "override manual" : "";

        if (!imageUrl) {
            imageUrl = await getWikipediaImageUrl(sp.wiki);
            source = "Wikipedia API";
        }

        if (imageUrl) {
            await updateDoc(doc(db, 'peixes', sp.id), { imagemUrl: imageUrl });
            console.log(`✅ ${source}: ${imageUrl.slice(0, 70)}...`);
        } else {
            console.log(`❌ Sem imagem encontrada — mantendo null`);
        }

        // Respeitar rate limit
        await new Promise(r => setTimeout(r, 300));
    }

    console.log("\n🎉 Todas as imagens atualizadas no Firestore!");
    process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
