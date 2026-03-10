import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env.local
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env.local') });

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

const SPOTS = [
    { id: 1, name: "Represa de Jurumirim", type: "Represa", state: "SP", species: ["Tucunaré", "Tilápia", "Traíra"], rating: 4.5, lat: -23.2, lng: -49.3 },
    { id: 2, name: "Rio Araguaia – Luís Alves", type: "Rio", state: "GO/MT", species: ["Tucunaré", "Pintado", "Pacu"], rating: 4.8, lat: -12.8, lng: -50.6 },
    { id: 3, name: "Pesqueiro Tô Atoa", type: "Pesqueiro", state: "SP", species: ["Tilápia", "Pacu", "Tambaqui"], rating: 4.2, lat: -23.5, lng: -46.8 },
    { id: 4, name: "Rio Negro – Barcelos", type: "Rio", state: "AM", species: ["Tucunaré-açu", "Pirarucu"], rating: 4.9, lat: -0.97, lng: -62.9 },
    { id: 5, name: "Represa de Três Marias", type: "Represa", state: "MG", species: ["Dourado", "Surubim", "Pirá"], rating: 4.4, lat: -18.2, lng: -45.2 },
    { id: 6, name: "Pantanal – Miranda", type: "Rio", state: "MS", species: ["Dourado", "Pintado", "Pacu"], rating: 4.7, lat: -20.2, lng: -56.4 },
];

async function seedSpots() {
    console.log("Seeding spots...");
    for (const spot of SPOTS) {
        const docRef = doc(db, 'spots', spot.id.toString());
        await setDoc(docRef, spot);
        console.log(`Saved: ${spot.name}`);
    }
    console.log("Done seeding.");
    process.exit(0);
}

seedSpots().catch(console.error);
