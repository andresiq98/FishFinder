import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import * as dotenv from 'dotenv';
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

const TOP_20 = [
    { folder: "Cichla_temensis_Tucunaré-Açu", sci: "Cichla temensis", name: "Tucunaré-açu", type: "Água doce", origin: "Nativa", min: 35, habitat: "Rios e lagos de águas claras da bacia amazônica", iscas: "Iscas de superfície, hélices, poppers", techniques: "Arremesso rápido, trabalho de superfície agressivo", season: "Setembro a Março (Bacia Amazônica)", curiosity: "O maior dos tucunarés, pode ultrapassar os 12kg. O macho desenvolve um calo na cabeça na época da reprodução." },
    { folder: "Salminus_brasiliensis_Dourado", sci: "Salminus brasiliensis", name: "Dourado", type: "Água doce", origin: "Nativa", min: 55, habitat: "Rios com muita correnteza, corredeiras", iscas: "Iscas de meia-água, colheres, tuvira", techniques: "Corrico e arremesso nas margens rápidas", season: "Março a Outubro", curiosity: "Conhecido como o 'Rei do Rio'. Possui força extrema e salta espetacularmente quando fisgado." },
    { folder: "Centropomus_undecimalis_Robalo-Flecha", sci: "Centropomus undecimalis", name: "Robalo-flecha", type: "Salgada/Estuário", origin: "Nativa", min: 40, habitat: "Estuários, manguezais, margens de rios que desaguam no mar", iscas: "Camarão vivo, jigs, shads", techniques: "Pesca de fundo e light tackle em estruturas", season: "Ano todo (Pico Nov–Mar)", curiosity: "Hermafrodita protândrico — nasce macho e vira fêmea ao longo da vida para se reproduzir." },
    { folder: "Pseudoplatystoma_corruscans_Pintado", sci: "Pseudoplatystoma corruscans", name: "Pintado", type: "Água doce", origin: "Nativa", min: 80, habitat: "Poços fundos de grandes rios nas bacias do Paraná, Paraguai", iscas: "Minhocoçu, tuvira, jejum", techniques: "Pesca de fundo pesada e rodada", season: "Fevereiro a Outubro", curiosity: "Apresenta corpo alongado coberto com pintas escuras. É noturno e altamente apreciado na culinária." },
    { folder: "Hoplias_malabaricus_Traíra", sci: "Hoplias malabaricus", name: "Traíra", type: "Água doce", origin: "Nativa", min: 25, habitat: "Lagoas de águas paradas, brejos, beiras com vegetação", iscas: "Sapos de borracha (frogs), spinnerbaits", techniques: "Trabalho de iscas anti-enrosco sobre a vegetação (camalote)", season: "Ano todo (melhor no calor)", curiosity: "Peixe extremamente resistente que consegue respirar ar atmosférico e sobreviver na lama em épocas de seca." },
    { folder: "Arapaima_gigas_Pirarucu", sci: "Arapaima gigas", name: "Pirarucu", type: "Água doce", origin: "Nativa", min: 150, habitat: "Lagos e rios de várzea da bacia amazônica", iscas: "Gigantescas iscas softs, peixes vivos", techniques: "Arremesso pesado, Fly Fishing", season: "Junho a Novembro", curiosity: "Um dos maiores peixes de água doce do mundo. Possui respiração aérea obrigatória, subindo à superfície a cada 20 minutos." },
    { folder: "Piaractus_mesopotamicus_Pacu", sci: "Piaractus mesopotamicus", name: "Pacu", type: "Água doce", origin: "Nativa", min: 40, habitat: "Rios do Pantanal e bacia do Prata, debaixo de matas ciliares", iscas: "Frutas nativas, bolinhas de massa, caranguejo", techniques: "Pesca na batida debaixo das árvores", season: "Setembro a Março", curiosity: "Peixe frugívoro. Fica à espera do som de frutos, como o tucum, caindo na água para abocanhá-los." },
    { folder: "Colossoma_macropomum_Tambaqui", sci: "Colossoma macropomum", name: "Tambaqui", type: "Água doce", origin: "Nativa", min: 55, habitat: "Rios amazônicos, matas inundadas (igapós)", iscas: "Frutas (castanhas, sementes de seringueira), massas", techniques: "Pesca de espera em águas paradas", season: "Ano todo", curiosity: "Possui uma das maxilas mais fortes entre os peixes, capaz de quebrar sementes extremamente duras como coquinhos." },
    { folder: "Brachyplatystoma_filamentosum_Piraíba", sci: "Brachyplatystoma filamentosum", name: "Piraíba", type: "Água doce", origin: "Nativa", min: 100, habitat: "Grandes calhas dos rios profundos da bacia amazônica e Tocantins", iscas: "Pedaços de peixes (cachorra, matrinxã)", techniques: "Pesca pesada de fundo, ancorado no canal do rio", season: "Maio a Outubro", curiosity: "Maior bagre do Brasil. Também chamada de 'Filhote' quando jovem. Pode crescer acima de 2 metros." },
    { folder: "Zungaro_jahu_Jaú", sci: "Zungaro jahu", name: "Jaú", type: "Água doce", origin: "Nativa", min: 90, habitat: "Poços profundos, cachoeiras e pedreiras do pantanal e rio Paraná", iscas: "Iscas naturais inteiras, tuviras, minhocoçu", techniques: "Pesca de fundo extra pesada", season: "Março a Setembro", curiosity: "Sua pescaria exige equipamentos muito fortes. Vive no fundo escuro e é capturado de forma agressiva." },
    { folder: "Hydrolycus_scomberoides_Cachorra", sci: "Hydrolycus scomberoides", name: "Cachorra", type: "Água doce", origin: "Nativa", min: 40, habitat: "Rios com correnteza forte, rebojos nas bacias Araguaia/Amazonas", iscas: "Iscas artificiais de meia-água, iscas vivas brancas", techniques: "Corrico ou arremesso próximo a pedras", season: "Maio a Outubro (seca)", curiosity: "Suas presas inferiores são tão grandes que possuem dois furos no céu da boca para acomodá-las quando fecham." },
    { folder: "Boulengerella_cuvieri_Bicuda", sci: "Boulengerella cuvieri", name: "Bicuda", type: "Água doce", origin: "Nativa", min: 35, habitat: "Águas rápidas, superfícies de rios de águas claras e corredeiras", iscas: "Zaras rápidas, iscas de superfície com hélice", techniques: "Arremessos dinâmicos e recolhimento super veloz", season: "Período de seca", curiosity: "Seu nome vem de seu longo focinho hidrodinâmico com o qual impala pequenas presas em alta velocidade." },
    { folder: "Brycon_amazonicus_Matrinxã", sci: "Brycon amazonicus", name: "Matrinxã", type: "Água doce", origin: "Nativa", min: 30, habitat: "Rios de corredeira, igarapés de águas rápidas", iscas: "Iscas articuladas, pequenos plugs, moscas (fly)", techniques: "Pesca leve e precisa", season: "Abril a Novembro", curiosity: "Muito combativa. Quando fisgada, costuma saltar muito e até engolir a isca profundamente." },
    { folder: "Plagioscion_squamosissimus_Corvina-de-Rio", sci: "Plagioscion squamosissimus", name: "Corvina de Água Doce", type: "Água doce", origin: "Nativa", min: 25, habitat: "Lagos secos, calhas profundas e baías dos rios da Amazônia e Paraná", iscas: "Jigs de chumbo, camarão vivo", techniques: "Técnica vertical com Jigs (pindocada)", season: "Junho a Outubro", curiosity: "Na sua reprodução emitem sons roncadores bem fortes chamativos que deram à família o nome de 'roncadores'." },
    { folder: "Pellona_castelnaeana_Apapá-Amarelo", sci: "Pellona castelnaeana", name: "Apapá-amarelo", type: "Água doce", origin: "Nativa", min: 35, habitat: "Rios cristalinos e rebojos profundos, cardumes na superfície", iscas: "Colheres médias, sticks pequenos de meia-água", techniques: "Arremesso de superfície ou iscas brilhantes", season: "Meio do ano", curiosity: "Conhecida como 'Dourada falsa', tem escamas prateado-amareladas muito brilhantes. Salta constantemente." },
    { folder: "Pseudoplatystoma_tigrinum_Caparari", sci: "Pseudoplatystoma tigrinum", name: "Caparari", type: "Água doce", origin: "Nativa", min: 70, habitat: "Semelhante ao pintado, bacias mais pro Norte (Amazonas / Araguaia)", iscas: "Iscas naturais no fundo, pedaços de carne", techniques: "Fundo com barco ancorado", season: "Maioria do ano", curiosity: "A principal diferença do Pintado é não ter pintas redondas, e sim listras pretas como um tigre." },
    { folder: "Brycon_hilarii_Piraputanga", sci: "Brycon hilarii", name: "Piraputanga", type: "Água doce", origin: "Nativa", min: 25, habitat: "Águas ricas em oxigênio como Pantanal e Bonito/MS", iscas: "Pequenos frutos, sementes de vegetação ciliar", techniques: "Pesca na batida imitndo queda de frutos", season: "Novembro a Março", curiosity: "A palavra 'Pira' é peixe e 'Pitanga' é vermelho em Tupi. É famosa pela coloração de nadadeiras avermelhada." },
    { folder: "Cichla_piquiti_Tucunaré-Azul", sci: "Cichla piquiti", name: "Tucunaré-azul", type: "Água doce", origin: "Nativa", min: 30, habitat: "Rios cristalinos, hoje muito presente no Sudeste", iscas: "Zaras, jigs, meia-água", techniques: "Arremessos sequenciais nas pauleiras", season: "Verão / Altas temperaturas", curiosity: "Ganhou essa fama por sua deslumbrante coloração azulada nos rios do Tocantins e Sudeste (Represas)." },
    { folder: "Megaleporinus_macrocephalus_Piavuçu", sci: "Megaleporinus macrocephalus", name: "Piavuçu", type: "Água doce", origin: "Nativa", min: 30, habitat: "Pantanal, áreas marginais de rios da planície de inundação", iscas: "Caramujo do cerrado ou massas grossas", techniques: "Pesca embarcada de ceva contínua no barranco", season: "Baixa seca", curiosity: "O 'gigante' dos piaus. Cresce incrivelmente bem nas secas do Pantanal e morde iscas com grande vigor." },
    { folder: "Cichla_pinima_Tucunaré-Pinima", sci: "Cichla pinima", name: "Tucunaré-pinima", type: "Água doce", origin: "Nativa", min: 35, habitat: "Nordeste do Brasil e baías no Norte", iscas: "Iscas grandes de Hélices", techniques: "Hélice de trabalho rápido gerando bastante barulho", season: "Novembro a Fevereiro", curiosity: "Sua principal característica são as manchas pintadas no corpo ao lado das 3 barras verticais." },
];

async function seed() {
    console.log("🚀 Iniciando migração das 20 grandes espécies do Brasil (Imagens Locais)...");

    const DATASET_DIR = path.join("c:", "Users", "Pichau", "OneDrive", "Documentos", "PEIXES", "dataset_peixes");
    const PUBLIC_DIR = path.join(__dirname, "..", "public", "images", "peixes");

    if (!fs.existsSync(PUBLIC_DIR)) {
        fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    let count = 0;

    for (const peixe of TOP_20) {
        const docId = peixe.sci.toLowerCase().replace(/[\s/]+/g, "_");

        let imageUrl = null;

        // Puxar da pasta
        const peixeFolderPath = path.join(DATASET_DIR, peixe.folder);
        if (fs.existsSync(peixeFolderPath)) {
            const files = fs.readdirSync(peixeFolderPath);
            const imageFile = files.find(f => f.endsWith('.jpg') || f.endsWith('.png'));

            if (imageFile) {
                const imgLocalPath = path.join(peixeFolderPath, imageFile);
                const ext = path.extname(imageFile);
                const destFileName = `${docId}${ext}`;
                const destPath = path.join(PUBLIC_DIR, destFileName);

                try {
                    fs.copyFileSync(imgLocalPath, destPath);
                    imageUrl = `/images/peixes/${destFileName}`;
                    console.log(`📸 Imagem local salva: ${imageUrl}`);
                } catch (e) {
                    console.error("❌ Erro copiando imagem:", e);
                }
            }
        }

        // Salvar no Firestore
        const peixeRef = doc(db, 'peixes', docId);

        const saveData = {
            id: docId,
            nomeCientifico: peixe.sci,
            nomePopular: peixe.name,
            tipo: peixe.type,
            origem: peixe.origin,
            minCM: peixe.min,
            habitat: peixe.habitat,
            iscas: peixe.iscas,
            tecnicas: peixe.techniques,
            temporada: peixe.season,
            curiosidade: peixe.curiosity,
            imagemUrl: imageUrl,
            dataAtualizacao: new Date().toISOString()
        };

        await setDoc(peixeRef, saveData);
        console.log(`✅ Salvo no Firestore: ${peixe.name}`);
        count++;
    }

    console.log(`🎉 Finalizado! ${count} peixes do TOP 20 migrados.`);
    process.exit(0);
}

seed().catch(console.error);
