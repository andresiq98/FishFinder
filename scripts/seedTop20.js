import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
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

// ─────────────────────────────────────────────────────────────────────────────
// TOP 20 ESPÉCIES — dados completos + fotos de alta qualidade (Wikimedia/iNaturalist)
// ─────────────────────────────────────────────────────────────────────────────
const TOP_20 = [
    {
        id: "cichla_temensis",
        nomePopular: "Tucunaré-açu",
        nomeCientifico: "Cichla temensis",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 35,
        pesoRecord: "13 kg",
        habitat: "Rios e lagos de águas claras e escuras da bacia amazônica. Prefere remansos próximos a troncos, pedras e macrófitas aquáticas.",
        iscas: "Poppers, hélices (prop baits), jerkbaits de 15–20 cm, iscas vivas como tucunaré menor ou matrinxã.",
        tecnicas: "Arremessos precisos para estruturas (troncos, pedras), trabalho de superfície agressivo com paradas. Idealmente com carretilha de cabecote aberto e linha mono 0.35–0.40mm.",
        temporada: "Setembro a Março (vazante/seca na Bacia Amazônica). Pico em Outubro e Novembro.",
        curiosidade: "O maior dos tucunarés, capaz de ultrapassar os 13 kg. Durante a reprodução o macho desenvolve um calo pronunciado na cabeça (giba) e cuida do ninho com agressividade extrema.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Cichla_temensis_Rio_Negro_edit.jpg/1280px-Cichla_temensis_Rio_Negro_edit.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "salminus_brasiliensis",
        nomePopular: "Dourado",
        nomeCientifico: "Salminus brasiliensis",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 55,
        pesoRecord: "31 kg",
        habitat: "Rios com forte correnteza, corredeiras e pedrais nas bacias do Paraná, Uruguai e Paraguai. Prefere águas oxigenadas e frias.",
        iscas: "Colheres ovais brilhantes, iscas articuladas de meia-água, tuvira viva e lambari. Cores douradas e prata.",
        tecnicas: "Corrico em corredeiras lançando para montante, arremesso nas margens de rios rápidos. Equipamentos de ação moderada/rápida com linha 0.30–0.35mm.",
        temporada: "Março a Outubro, com pico na seca (Maio a Agosto). Piracema proibida no verão na maioria dos estados.",
        curiosidade: "O 'Rei do Rio' da pesca esportiva sul-americana. Possui força descomunal e salta fora d'água espetacularmente quando fisgado. Suas escamas douradas são únicas no mundo.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Salminus_brasiliensis_01.jpg/1280px-Salminus_brasiliensis_01.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "centropomus_undecimalis",
        nomePopular: "Robalo-flecha",
        nomeCientifico: "Centropomus undecimalis",
        tipo: "Salgada/Estuário",
        origem: "Nativa",
        minCM: 40,
        pesoRecord: "24 kg",
        habitat: "Estuários, manguezais, desembocaduras de rios, costões rochosos e bancos de areia. Tolera bem a transição sal/doce.",
        iscas: "Camarão vivo, tilápias e tainholas vivas, jigs de 14–21g com cauda shad, swimbaits.",
        tecnicas: "Pesca em estruturas (postes, raízes, valas de maré) com lançamentos precisos. Light tackle com vara 6–7' médio-pesada.",
        temporada: "Ano todo no litoral Norte. Pico de Novembro a Março nas regiões Sul e Sudeste (entrada pelo litoral).",
        curiosidade: "Hermafrodita protândrico: nasce macho e se transforma em fêmea ao longo da vida. Os maiores exemplares são sempre fêmeas.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Centropomus_undecimalis.jpg/1280px-Centropomus_undecimalis.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "pseudoplatystoma_corruscans",
        nomePopular: "Pintado",
        nomeCientifico: "Pseudoplatystoma corruscans",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 80,
        pesoRecord: "97 kg",
        habitat: "Poços fundos em grandes rios com fundo arenoso nas bacias do Paraná, Paraguai e São Francisco.",
        iscas: "Minhocoçu (minhoca grande), tuvira viva, lambari inteiro, filé de peixe robusto.",
        tecnicas: "Pesca de fundo estacionária com vara pesada, carretilha e linha 0.50–0.70mm. Anzóis circulares #8–12/0.",
        temporada: "Ano todo. Pico durante a seca (Maio a Outubro). Piracema proibida no verão.",
        curiosidade: "O pintado tem pintas escuras arredondadas sobre fundo cinza-prata. É um dos mais apreciados na culinária brasileira e migra centenas de quilômetros para reprodução.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Pseudoplatystoma_corruscans_Porto_esperança.jpg/1280px-Pseudoplatystoma_corruscans_Porto_esperança.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "arapaima_gigas",
        nomePopular: "Pirarucu",
        nomeCientifico: "Arapaima gigas",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 150,
        pesoRecord: "250 kg",
        habitat: "Lagos e rios de várzea de águas lentas na bacia Amazônica, especialmente em lagos rasos até 5 metros de profundidade.",
        iscas: "Iscas artificiais gigantescas (swimbaits 20–30cm), peixes vivos grandes. A pesca esportiva tipo catch-and-release é a principal modalidade.",
        tecnicas: "Fly fishing com vara #12–14 e linhas com sink-tip, ou arremesso pesado aguardando o pirarucu subir para respirar.",
        temporada: "Junho a Novembro (seca amazônica). O peixe fica concentrado em lagos com nível baixo.",
        curiosidade: "Um dos maiores peixes de água doce do mundo. Possui respiração aérea obrigatória e precisa subir à superfície a cada 10–20 minutos — o que o torna visível e acessível à pesca.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Arapaima_gigas_1.jpg/1280px-Arapaima_gigas_1.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "colossoma_macropomum",
        nomePopular: "Tambaqui",
        nomeCientifico: "Colossoma macropomum",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 55,
        pesoRecord: "44 kg",
        habitat: "Rios amazônicos e matas inundadas (igapós e várzeas), especialmente sob frutas e sementes caindo na água.",
        iscas: "Castanha-da-amazônia, sementes de seringueira, caranguejo e iscas de massa com sabor de frutas tropicais.",
        tecnicas: "Pesca de espera em áreas com matas inundadas, embarcado, com varas médias. Aguardar o som de frutas e sementes caindo.",
        temporada: "Ano todo na Amazônia. Melhor com as chuvas (Novembro a Fevereiro) quando inunda e abre acesso às matas.",
        curiosidade: "Possui molares extremamente poderosos — uma das maxilas mais fortes entre os peixes. Consegue quebrar sementes duras como castanhas e coquinhos.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Colossoma_macropomum_1.jpg/1280px-Colossoma_macropomum_1.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "piaractus_mesopotamicus",
        nomePopular: "Pacu",
        nomeCientifico: "Piaractus mesopotamicus",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 40,
        pesoRecord: "28 kg",
        habitat: "Rios do Pantanal e bacia do Prata, especialmente sob matas ciliares e próximo a figueiras e tucuns.",
        iscas: "Frutas nativas (tucum, figo, manga), bolinhas de massa com aniz, caranguejo, milho.",
        tecnicas: "Pesca na batida — lançar isca embaixo das árvores ribeirinhas simulando queda de frutos. Varas médias 20–30lb.",
        temporada: "Setembro a Março. Pico em Outubro-Novembro quando as figueiras e tucuns estão frutificando.",
        curiosidade: "Peixe frugívoro especializado. Ouve o som de frutos e sementes caindo na água e nada rapidamente para comê-los. Seus dentes assemelham-se a molares humanos.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Piaractus_mesopotamicus.jpg/1280px-Piaractus_mesopotamicus.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "brachyplatystoma_filamentosum",
        nomePopular: "Piraíba",
        nomeCientifico: "Brachyplatystoma filamentosum",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 100,
        pesoRecord: "200 kg",
        habitat: "Grandes calhas de rios profundos da bacia Amazônica, Tocantins e Araguaia. Vive em profundidades de 20–60 metros.",
        iscas: "Pedaços grandes de peixes (cachorra, matrinxã, sardinha), jejum robusto no anzol #12/0 ou maior.",
        tecnicas: "Pesca pesada de fundo com vara de barco, carretilha elétrica ou multiplicadora potente. Linha 0.80mm–1.0mm ou multifilamento 150lb.",
        temporada: "Maio a Outubro (seca). Durante as cheias migra para áreas de reprodução fora do alcance dos pescadores.",
        curiosidade: "O maior bagre do Brasil e um dos maiores peixes de água doce do planeta. Os filhotes (chamados de 'filhote') realizam migrações de até 5.000 km na bacia amazônica.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Brachyplatystoma_filamentosum.jpg/1280px-Brachyplatystoma_filamentosum.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "zungaro_jahu",
        nomePopular: "Jaú",
        nomeCientifico: "Zungaro jahu",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 90,
        pesoRecord: "140 kg",
        habitat: "Poços profundos, quedas d'água, pedrais e cavas em grandes rios do Pantanal, Paraná e São Francisco.",
        iscas: "Iscas naturais inteiras (lambari, tuvira grande), filé de peixe em anzol /10-12/0.",
        tecnicas: "Pesca de fundo extra-pesada com âncora. Exige equipamento de altíssima resistência — varas acima de 60lb, linha multifilamento 200lb.",
        temporada: "Março a Setembro (seca). Difícil de capturar durante cheia pois se dispersa entre as matas.",
        curiosidade: "Vive exclusivamente em poços profundos e escuros. Sua pescaria requer paciência extrema e equipamentos robustíssimos. A pressão de captura quase levou a espécie à ameaça de extinção.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Zungaro_jahu.jpg/1280px-Zungaro_jahu.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "hydrolycus_scomberoides",
        nomePopular: "Cachorra",
        nomeCientifico: "Hydrolycus scomberoides",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 40,
        pesoRecord: "18 kg",
        habitat: "Rios com forte correnteza, rebojos e poços abaixo de pedras e cachoeiras nas bacias Araguaia, Amazonas e Tocantins.",
        iscas: "Iscas metálicas pesadas de meia-água (jigs e colheres), iscas vivas prateadas como matrinxã.",
        tecnicas: "Corrico em corredeiras ou arremesso próximo a pedras e remansos. Recolhimento rápido e variado. Vara de ação rápida.",
        temporada: "Maio a Outubro (seca). Os cardumes ficam concentrados nos rebojos durante a estiagem.",
        curiosidade: "Suas duas presas inferiores são tão enormes que existem dois buracos específicos no céu da boca para acomodá-las quando a boca fecha. A pressão de mordida é impressionante.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Hydrolycus_scomberoides.jpg/1280px-Hydrolycus_scomberoides.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "hoplias_malabaricus",
        nomePopular: "Traíra",
        nomeCientifico: "Hoplias malabaricus",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 25,
        pesoRecord: "8 kg",
        habitat: "Lagoas de água parada, brejos, beiras com vegetação densa (camalotes, aguapés), represas rasas e pântanos.",
        iscas: "Sapos de borracha (frogs), spinnerbaits com saia volumosa, swimbaits anti-enrosco.",
        tecnicas: "Pesca de flog (sapo artificial) sobre vegetação flutuante. Lançar sobre o camalote e arrastar lentamente. Vara de ação rápida e linha grossa (50–80lb PE).",
        temporada: "Ano todo. Mais ativa em dias quentes. Verão com águas altas traz acesso ao camalote.",
        curiosidade: "Um dos peixes mais resistentes do Brasil. Consegue respirar ar atmosférico diretamente e sobreviver na lama seca por meses durante estiagens severas.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Hoplias_malabaricus_edit.jpg/1280px-Hoplias_malabaricus_edit.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "brycon_amazonicus",
        nomePopular: "Matrinxã",
        nomeCientifico: "Brycon amazonicus",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 30,
        pesoRecord: "5 kg",
        habitat: "Igarapés e rios de corredeiras de águas rápidas, claras ou pretas na bacia Amazônica e Araguaia.",
        iscas: "Iscas articuladas finas, pequenos jerkbaits, strimmers e moscas de fly (padrões locais).",
        tecnicas: "Pesca leve com varas de 5'6\"–6' e monofilamento 0.25mm. Lançamentos precisos em corredeiras rasas e chapadões.",
        temporada: "Abril a Novembro. Mais combativa durante a seca quando as corredeiras ficam expostas.",
        curiosidade: "A matrinxã é extremamente combativa para seu tamanho — realiza saltos fora d'água e combates acrobáticos que encantam pescadores de fly fishing.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Brycon_amazonicus.jpg/1280px-Brycon_amazonicus.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "pseudoplatystoma_tigrinum",
        nomePopular: "Caparari",
        nomeCientifico: "Pseudoplatystoma tigrinum",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 70,
        pesoRecord: "80 kg",
        habitat: "Grandes rios da bacia Amazônica e Araguaia, em poços fundos e canais principais com fundo arenoso.",
        iscas: "Iscas naturais no fundo (lambari, tuvira, filé de peixe), pedaços de carne.",
        tecnicas: "Pesca de fundo com barco ancorado no canal do rio. Equipamento pesado, linha 0.60–0.80mm.",
        temporada: "Durante a maior parte do ano. Melhor na seca quando os peixes se concentram nos poços.",
        curiosidade: "A diferença principal em relação ao pintado são as listras pretas verticais (como um tigre) no lugar das pintas arredondadas. Ocorre naturalmente em simpatria com o pintado.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Pseudoplatystoma_tigrinum.jpg/1280px-Pseudoplatystoma_tigrinum.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "boulengerella_cuvieri",
        nomePopular: "Bicuda",
        nomeCientifico: "Boulengerella cuvieri",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 35,
        pesoRecord: "6 kg",
        habitat: "Corredeiras e superfícies de rios de águas claras na bacia Amazônica e Araguaia. Forma cardumes na superfície.",
        iscas: "Zaras de recolhimento veloz, iscas de superfície com hélice (prop baits), stickbaits finos.",
        tecnicas: "Arremessos dinâmicos com recolhimento super acelerado imitando peixinho em fuga. Fundamental a velocidade da recuperação.",
        temporada: "Período de seca (Maio a Outubro) quando os cardumes ficam expostos nas corredeiras.",
        curiosidade: "Seu longo focinho hidrodinâmico funciona como um arpão: ela impala pequenas presas em alta velocidade antes de engoli-las. Daí o nome 'bicuda'.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Boulengerella_cuvieri.jpg/1280px-Boulengerella_cuvieri.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "plagioscion_squamosissimus",
        nomePopular: "Corvina de Rio",
        nomeCientifico: "Plagioscion squamosissimus",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 25,
        pesoRecord: "4 kg",
        habitat: "Calhas profundas, lagos e baías dos grandes rios da Amazônia, Paraná e Tocantins. Forma cardumes em estruturas submersas.",
        iscas: "Jigs de chumbo 14–21g, camarão vivo, minhoca e sardinha. Iscas brilhantes são preferidas.",
        tecnicas: "Pesca vertical com jigs (pindocada) — descer o jig até o fundo e sacudir verticalmente. Muito eficiente em cardumes localizados.",
        temporada: "Junho a Outubro. Os cardumes ficam mais concentrados na seca em poços definidos.",
        curiosidade: "Na época de reprodução os corvinas emitem sons roncadores intensos usados para atração de parceiros. Esta característica acústica deu o nome à família Sciaenidae de 'roncadores'.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Plagioscion_squamosissimus.jpg/1280px-Plagioscion_squamosissimus.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "cichla_piquiti",
        nomePopular: "Tucunaré-azul",
        nomeCientifico: "Cichla piquiti",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 30,
        pesoRecord: "7 kg",
        habitat: "Rios cristalinos do Tocantins e Araguaia; hoje amplamente difundido em represas do Sudeste brasileiro.",
        iscas: "Zaras, jigs de silicone, iscas de meia-água e superfície, swimbaits de 10–15cm.",
        tecnicas: "Arremessos sequenciais de precisão para estruturas (troncos, pedras). Trabalho de fundo e meia-água com paradas longas.",
        temporada: "Verão e altas temperaturas (Outubro a Março). Mais agressivo em águas quentes.",
        curiosidade: "Espécie endêmica do Tocantins, ganhou coloração azul-esverdeada deslumbrante nos machos maduros. Foi o tucunaré que mais se adaptou às represas do Sudeste como Furnas, Serra da Mesa e Tucuruí.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cichla_piquiti.jpg/1280px-Cichla_piquiti.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "brycon_hilarii",
        nomePopular: "Piraputanga",
        nomeCientifico: "Brycon hilarii",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 25,
        pesoRecord: "5 kg",
        habitat: "Rios oxigenados e corredeiras do Pantanal, especialmente em Bonito/MS. Prefere margens com vegetação ribeirinha.",
        iscas: "Pequenas frutas nativas, sementes de vegetação ciliar, iscas de mosca, pequenos plugs articulados.",
        tecnicas: "Pesca na batida imitando queda de frutos — lançar a isca próximo à margem com vegetação. Muito popular no fly fishing de rios cristalinos.",
        temporada: "Novembro a Março (período de frutificação das matas ciliares). Excelente no verão chuvoso.",
        curiosidade: "'Pira' é peixe e 'putanga' vem de pitanga (vermelho) em Tupi. A coloração das nadadeiras dorsal, peitoral e caudal é vermelha-alaranjada vibrante — belíssima.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Brycon_hilarii.jpg/1280px-Brycon_hilarii.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "pellona_castelnaeana",
        nomePopular: "Apapá-amarelo",
        nomeCientifico: "Pellona castelnaeana",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 35,
        pesoRecord: "5 kg",
        habitat: "Rios cristalinos de águas claras com corredeiras e rebojos profundos da bacia Amazônica e Araguaia.",
        iscas: "Colheres médias ovais, sticks pequenos de meia-água, iscas brilhantes prateadas e douradas.",
        tecnicas: "Arremesso de superfície ou meia-água com recolhimento médio. Segue cardumes em rebojos dos rios.",
        temporada: "Período de seca (meio do ano). Os cardumes concentram-se em corredeiras específicas.",
        curiosidade: "Conhecida como 'dourada falsa' por suas escamas prateado-amareladas extremamente brilhantes. Quando fisgada, salta constantemente fora d'água em exibições acrobáticas.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Pellona_castelnaeana.jpg/1280px-Pellona_castelnaeana.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "megaleporinus_macrocephalus",
        nomePopular: "Piavuçu",
        nomeCientifico: "Megaleporinus macrocephalus",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 30,
        pesoRecord: "7 kg",
        habitat: "Rios e planícies de inundação do Pantanal e bacia do Paraguai. Frequenta margens barrentas com vegetação.",
        iscas: "Caramujo do cerrado (pacu-de-concha) esmagado, massas grossas com farinha de carne, frutas.",
        tecnicas: "Pesca embarcada com ceva contínua na margem (barranco). Lançamentos curtos à margem com anzóis #4–8.",
        temporada: "Período de seca baixa no Pantanal (Julho a Outubro) quando as águas estão baixas e claras.",
        curiosidade: "O 'gigante' da família dos piaus. Cresce notavelmente no Pantanal durante as secas e é altamente combativo para seu tamanho.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Leporinus_macrocephalus.jpg/1280px-Leporinus_macrocephalus.jpg",
        dataAtualizacao: new Date().toISOString()
    },
    {
        id: "cichla_pinima",
        nomePopular: "Tucunaré-pinima",
        nomeCientifico: "Cichla pinima",
        tipo: "Água doce",
        origem: "Nativa",
        minCM: 35,
        pesoRecord: "9 kg",
        habitat: "Rios do Nordeste do Brasil (Tocantins/PA) e baías no Norte. Prefere águas mais escuras e ricas em taninos.",
        iscas: "Iscas grandes de hélice (prop baits), poppers de 10–15cm, swimbaits de superfície.",
        tecnicas: "Trabalho de hélice rápido gerando barulho e espirros — esta espécie responde agressivamente ao disturbo de superfície.",
        temporada: "Novembro a Fevereiro (verão). Mais agressivo no período quente.",
        curiosidade: "Sua principal característica estética são as manchas irregulares pintadas no corpo ao lado das 3 barras verticais escuras. Uma das espécies mais exuberantes do gênero Cichla.",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Cichla_pinima.jpg/1280px-Cichla_pinima.jpg",
        dataAtualizacao: new Date().toISOString()
    },
];

async function seed() {
    console.log("🚀 Iniciando limpeza e seed do TOP 20...");

    // 1. Deletar todos os documentos existentes na coleção peixes
    console.log("🗑️  Limpando coleção 'peixes' existente...");
    const snapshot = await getDocs(collection(db, 'peixes'));
    const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, 'peixes', d.id)));
    await Promise.all(deletePromises);
    console.log(`✅ ${snapshot.docs.length} documentos removidos.`);

    // 2. Inserir os 20 novos documentos
    console.log("📝 Inserindo os 20 peixes curados...");
    let count = 0;
    for (const peixe of TOP_20) {
        const { id, ...data } = peixe;
        await setDoc(doc(db, 'peixes', id), data);
        console.log(`✅ ${peixe.nomePopular} (${id})`);
        count++;
    }

    console.log(`\n🎉 Seed concluído! ${count}/20 peixes inseridos no Firestore.`);
    process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
