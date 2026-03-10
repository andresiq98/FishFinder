/**
 * deployLocalPhotos.js
 * Copies generated AI fish images from the brain artifacts dir to public/images/peixes/
 * and updates Firestore with /images/peixes/{id}.png paths
 */
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const app = initializeApp({
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
});
const db = getFirestore(app);

const BRAIN_DIR = "C:\\Users\\Pichau\\.gemini\\antigravity\\brain\\fb60185b-bda7-4965-a683-f0f862e3f679";
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images', 'peixes');

if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

// Map: docId -> generated image filename prefix in brain dir
const IMAGE_MAP = [
    { id: "cichla_temensis", prefix: "peixe_cichla_temensis_" },
    { id: "salminus_brasiliensis", prefix: "peixe_salminus_brasiliensis_" },
    { id: "centropomus_undecimalis", prefix: "peixe_centropomus_undecimalis_" },
    { id: "pseudoplatystoma_corruscans", prefix: "peixe_pseudoplatystoma_corruscans_" },
    { id: "arapaima_gigas", prefix: "peixe_arapaima_gigas_" },
    { id: "colossoma_macropomum", prefix: "peixe_colossoma_macropomum_" },
    { id: "piaractus_mesopotamicus", prefix: "peixe_piaractus_mesopotamicus_" },
    { id: "brachyplatystoma_filamentosum", prefix: "peixe_brachyplatystoma_filamentosum_" },
    { id: "zungaro_jahu", prefix: "peixe_zungaro_jahu_" },
    { id: "hydrolycus_scomberoides", prefix: "peixe_hydrolycus_scomberoides_" },
    { id: "hoplias_malabaricus", prefix: "peixe_hoplias_malabaricus_" },
    { id: "brycon_amazonicus", prefix: "peixe_brycon_amazonicus_" },
    { id: "pseudoplatystoma_tigrinum", prefix: "peixe_pseudoplatystoma_tigrinum_" },
    { id: "boulengerella_cuvieri", prefix: "peixe_boulengerella_cuvieri_" },
    { id: "plagioscion_squamosissimus", prefix: "peixe_plagioscion_squamosissimus_" },
    { id: "cichla_piquiti", prefix: "peixe_cichla_piquiti_" },
    { id: "brycon_hilarii", prefix: "peixe_brycon_hilarii_" },
    // These 3 didn't generate — will be skipped (keep null / emoji fallback)
    { id: "pellona_castelnaeana", prefix: "peixe_pellona_castelnaeana_" },
    { id: "megaleporinus_macrocephalus", prefix: "peixe_megaleporinus_macrocephalus_" },
    { id: "cichla_pinima", prefix: "peixe_cichla_pinima_" },
];

async function run() {
    console.log("📦 Copiando imagens geradas para public/images/peixes/ ...\n");
    const brainFiles = fs.readdirSync(BRAIN_DIR);
    let copied = 0, skipped = 0, updated = 0;

    for (const item of IMAGE_MAP) {
        // Find the latest file with matching prefix
        const matches = brainFiles.filter(f => f.startsWith(item.prefix) && (f.endsWith('.png') || f.endsWith('.webp')));
        if (matches.length === 0) {
            console.log(`⚠️  Sem imagem gerada para ${item.id} — pulando`);
            skipped++;
            continue;
        }

        // Take the latest one (highest timestamp in name)
        const latest = matches.sort().pop();
        const ext = path.extname(latest);
        const srcPath = path.join(BRAIN_DIR, latest);
        const destName = `${item.id}${ext}`;
        const destPath = path.join(PUBLIC_DIR, destName);

        fs.copyFileSync(srcPath, destPath);
        console.log(`📸 Copiado: ${destName}`);
        copied++;

        // Update Firestore
        const publicUrl = `/images/peixes/${destName}`;
        await updateDoc(doc(db, 'peixes', item.id), { imagemUrl: publicUrl });
        console.log(`✅ Firestore atualizado: ${item.id} → ${publicUrl}`);
        updated++;
    }

    console.log(`\n🎉 ${copied} imagens copiadas | ${updated} documentos atualizados | ${skipped} pulados`);
    process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
