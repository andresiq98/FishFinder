/**
 * seedSpotsSP3.js — Bragança Paulista, Atibaia + principais cidades do interior
 * Adiciona sem apagar os existentes
 */
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as dotenv from 'dotenv';
import path from 'path';
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

const SPOTS = [

    // ══════════════════════════════════════════════════
    // REGIÃO DE BRAGANÇA PAULISTA
    // ══════════════════════════════════════════════════
    {
        id: "pesqueiro_braganca_recanto",
        name: "Pesqueiro Recanto das Hortênsias",
        type: "Pesqueiro",
        lat: -22.9523, lng: -46.5412,
        rating: 4.5, reviewCount: 1234,
        address: "Bragança Paulista, SP",
        distance: "90 km da capital",
        state: "SP",
        species: ["Tilápia", "Pacu", "Tucunaré", "Tambaqui", "Carpa"],
        description: "Um dos pesqueiros mais queridos da região de Bragança. Lagos bem estruturados com ambiente serrano fresco. Ideal para família.",
        dicas: "Pacu: boliche de milho ou caranguejo perto dos troncos submersos. Tucunaré: plug de manhã.",
        regras: "Proibido tarrafa. Devolver peixes doentes ou acima do limite incluído no pacote.",
        preco: "R$ 80–120/dia com café da manhã",
        googleMapsUrl: "https://maps.google.com/?q=-22.9523,-46.5412"
    },
    {
        id: "represa_braganca_jaguari",
        name: "Represa Jaguari — Bragança",
        type: "Represa",
        lat: -22.9834, lng: -46.4923,
        rating: 4.4, reviewCount: 892,
        address: "Bragança Paulista, SP",
        distance: "92 km da capital",
        state: "SP",
        species: ["Tucunaré", "Tilápia", "Traíra", "Lambari", "Curvina"],
        description: "Represa do sistema Cantareira com pontos de acesso público. Tucunarés de bom porte na região das ilhas e vegetação submersa.",
        dicas: "Explore a área das ilhotas no meio da represa — concentração alta de tucunarés. Popper no cedo.",
        regras: "Área de proteção de manancial — respeite os limites. Licença IBAMA obrigatória.",
        preco: "Acesso gratuito em pontos públicos. Barcos R$ 80–120/dia.",
        googleMapsUrl: "https://maps.google.com/?q=-22.9834,-46.4923"
    },
    {
        id: "pesqueiro_braganca_lago_azul",
        name: "Pesqueiro Lago Azul Bragança",
        type: "Pesqueiro",
        lat: -22.9312, lng: -46.5634,
        rating: 4.3, reviewCount: 678,
        address: "Bragança Paulista, SP",
        distance: "91 km da capital",
        state: "SP",
        species: ["Tilápia", "Carpa", "Bagre", "Pacu"],
        description: "Pesqueiro familiar em Bragança Paulista com clima agradável e boa sombra. Popular entre famílias da cidade e turistas.",
        dicas: "Carpa ativa no fundo com boillie de baunilha. Bagre de fundo com minhoca grossa.",
        regras: "Carpa: devolução obrigatória acima de 3kg.",
        preco: "R$ 60–90/dia",
        googleMapsUrl: "https://maps.google.com/?q=-22.9312,-46.5634"
    },
    {
        id: "rio_jaguari_braganca",
        name: "Rio Jaguari — Montante Represa",
        type: "Rio",
        lat: -22.8923, lng: -46.5012,
        rating: 4.3, reviewCount: 445,
        address: "Bragança Paulista, SP",
        distance: "90 km da capital",
        state: "SP",
        species: ["Dourado", "Curvina", "Curimbatá", "Lambari", "Traíra"],
        description: "Trecho do Rio Jaguari com corredeiras e águas limpas. Dourado pequeno combativo e curvina nos poços.",
        dicas: "Curvina: jig leve de 10g nos poços mais profundos abaixo das pedras. Curimba nas rápidas.",
        regras: "Licença estadual. Área de APP — respeite a mata ciliar.",
        preco: "Acesso gratuito via pontes públicas.",
        googleMapsUrl: "https://maps.google.com/?q=-22.8923,-46.5012"
    },
    {
        id: "pesqueiro_piracaia",
        name: "Pesque-Pague Serra Verde — Piracaia",
        type: "Pesqueiro",
        lat: -23.0534, lng: -46.3623,
        rating: 4.2, reviewCount: 387,
        address: "Piracaia, SP",
        distance: "85 km da capital",
        state: "SP",
        species: ["Tilápia", "Pacu", "Tucunaré", "Lambari"],
        description: "Pesqueiro em Piracaia (próximo a Bragança) com vista para a Serra da Mantiqueira. Ambiente tranquilo.",
        dicas: "Tilápia na superfície com pão de manhã. Tucunaré no fundo com jig shad à tarde.",
        regras: "Pesca apenas com vara. Crianças até 8 anos não pagam.",
        preco: "R$ 55–85/dia",
        googleMapsUrl: "https://maps.google.com/?q=-23.0534,-46.3623"
    },
    {
        id: "pesqueiro_nazare_paulista",
        name: "Pesqueiro Mirante das Águas — Nazaré Paulista",
        type: "Pesqueiro",
        lat: -23.1803, lng: -46.3912,
        rating: 4.5, reviewCount: 1045,
        address: "Nazaré Paulista, SP",
        distance: "78 km da capital",
        state: "SP",
        species: ["Tilápia", "Pacu", "Tucunaré", "Tambaqui", "Carpa"],
        description: "Pesqueiro com vista deslumbrante para a Represa Atibainha. Muito bem avaliado pelo visual e qualidade dos peixes.",
        dicas: "Pacu e tambaqui respondem bem a frutas (goiaba, banana) jogadas na margem.",
        regras: "Proibido camping no local. Horário 6h–18h.",
        preco: "R$ 75–110/dia",
        googleMapsUrl: "https://maps.google.com/?q=-23.1803,-46.3912"
    },

    // ══════════════════════════════════════════════════
    // REGIÃO DE ATIBAIA (EXPANDIDA)
    // ══════════════════════════════════════════════════
    {
        id: "represa_atibaia_itapeva",
        name: "Represa de Itapeva — Atibaia",
        type: "Represa",
        lat: -23.0923, lng: -46.5012,
        rating: 4.4, reviewCount: 734,
        address: "Atibaia, SP",
        distance: "70 km da capital",
        state: "SP",
        species: ["Tucunaré", "Tilápia", "Traíra", "Lambari"],
        description: "Represa de Itapeva em Atibaia com margens preservadas. Excelente para tucunaré e traíra nos camalotes.",
        dicas: "Traíra no camalote da manhã com sapo de silicone. Tucunaré nos galhos submersos à tarde.",
        regras: "Zona de conservação ambiental — pesca de barco sem motor elétrico apenas.",
        preco: "Acesso público + aluguel de caiaque/barco R$ 60/dia.",
        googleMapsUrl: "https://maps.google.com/?q=-23.0923,-46.5012"
    },
    {
        id: "pesqueiro_atibaia_sao_gabriel",
        name: "Pesqueiro São Gabriel — Atibaia",
        type: "Pesqueiro",
        lat: -23.1234, lng: -46.5523,
        rating: 4.6, reviewCount: 1678,
        address: "Atibaia, SP",
        distance: "72 km da capital",
        state: "SP",
        species: ["Tilápia", "Tucunaré", "Pacu", "Tambaqui", "Pintado"],
        description: "Pesqueiro premium de Atibaia. Lago do pintado é a grande atração — peixes acima de 5kg regulares.",
        dicas: "Pintado: isca viva (lambari) no fundo após às 18h. Tucunaré: jig twister às 7h.",
        regras: "Lago do pintado: equipamento acima de 30lb e guia credenciado obrigatório.",
        preco: "R$ 90–250/dia (pintado separado)",
        googleMapsUrl: "https://maps.google.com/?q=-23.1234,-46.5523"
    },
    {
        id: "pesqueiro_atibaia_beira_lago",
        name: "Pesque-Pague Beira Lago — Atibaia",
        type: "Pesqueiro",
        lat: -23.1012, lng: -46.5723,
        rating: 4.3, reviewCount: 823,
        address: "Atibaia, SP",
        distance: "70 km da capital",
        state: "SP",
        species: ["Tilápia", "Carpa", "Pacu", "Bagre", "Lambari"],
        description: "Pesqueiro clássico de Atibaia à beira de lago natural. Ótimo custo-benefício e ambiente bem arborizado.",
        dicas: "Carpa: boillie no fundo pela manhã. Tilápia e pacu no meio da água com bóia.",
        regras: "Pesca com vara apenas. Proibido isca viva.",
        preco: "R$ 65–95/dia",
        googleMapsUrl: "https://maps.google.com/?q=-23.1012,-46.5723"
    },

    // ══════════════════════════════════════════════════
    // PRINCIPAIS CIDADES DO INTERIOR — 2–3 spots cada
    // ══════════════════════════════════════════════════

    // ─── São José dos Campos ─────────────────────────
    {
        id: "pesque_sj_campos",
        name: "Pesqueiro Mirante do Vale — SJC",
        type: "Pesqueiro",
        lat: -23.2012, lng: -45.8923,
        rating: 4.4, reviewCount: 956,
        address: "São José dos Campos, SP",
        distance: "95 km da capital",
        state: "SP",
        species: ["Tilápia", "Pacu", "Tucunaré", "Tambaqui"],
        description: "O melhor pesqueiro do Vale do Paraíba. Infraestrutura excelente, peixes selecionados e vista para a Serra da Mantiqueira.",
        dicas: "Pacu: massa de milho perto das pedras. Tucunaré: streaming no cedo no lago 2.",
        regras: "Pacotes por período (manhã/tarde/dia todo). Infantil gratuito até 10 anos.",
        preco: "R$ 80–130/dia",
        googleMapsUrl: "https://maps.google.com/?q=-23.2012,-45.8923"
    },
    {
        id: "represa_paraibuna_sjc",
        name: "Represa Paraibuna — São José dos Campos",
        type: "Represa",
        lat: -23.3834, lng: -45.6612,
        rating: 4.3, reviewCount: 678,
        address: "Paraibuna, SP",
        distance: "115 km da capital",
        state: "SP",
        species: ["Tucunaré", "Tilápia", "Traíra", "Curvina", "Lambari"],
        description: "Grande represa do Vale do Paraíba com bons tucunarés e curvinas. Acesso pela Dutra com paisagem bonita.",
        dicas: "Tucunaré nos braços da represa com plug articulado. Curvina no canal principal com jig.",
        regras: "Licença IBAMA. Barcos sem motor apenas.",
        preco: "Barcos aluguel R$ 80–150/dia.",
        googleMapsUrl: "https://maps.google.com/?q=-23.3834,-45.6612"
    },

    // ─── São José do Rio Preto ───────────────────────
    {
        id: "pesqueiro_riopreto_aquario",
        name: "Pesqueiro Aquário Azul — Rio Preto",
        type: "Pesqueiro",
        lat: -20.8312, lng: -49.3834,
        rating: 4.5, reviewCount: 1456,
        address: "São José do Rio Preto, SP",
        distance: "447 km da capital",
        state: "SP",
        species: ["Tilápia", "Pacu", "Tucunaré", "Pintado", "Tambaqui"],
        description: "Um dos melhores pesqueiros do noroeste paulista. Vários lagos por espécie, estrutura de resort e restaurante.",
        dicas: "Pintado: tuvira no fundo à noite. Tucunaré no lago esportivo cedo com isca artificial.",
        regras: "Lago especial do pintado: guia obrigatório e reserva antecipada.",
        preco: "R$ 90–250/dia",
        googleMapsUrl: "https://maps.google.com/?q=-20.8312,-49.3834"
    },
    {
        id: "represa_riopreto_barra_mansa",
        name: "Represa Barra Mansa — Rio Preto",
        type: "Represa",
        lat: -20.7834, lng: -49.4523,
        rating: 4.3, reviewCount: 567,
        address: "São José do Rio Preto, SP",
        distance: "450 km da capital",
        state: "SP",
        species: ["Tucunaré", "Curvina", "Pintado", "Dourado"],
        description: "Represa urbana de Rio Preto com boa pesca de tucunaré e curvinas. Acesso fácil e infraestrutura de apoio.",
        dicas: "Curvina na vertical com jig leve de 14g em fundos 8–15m. Tucunaré nos galhos submersos.",
        regras: "Licença estadual. Limite de 5 peixes/pescador/dia.",
        preco: "Acesso gratuito em alguns pontos. Barcos R$ 80/dia.",
        googleMapsUrl: "https://maps.google.com/?q=-20.7834,-49.4523"
    },
    {
        id: "rio_preto_turvo_pesca",
        name: "Rio Preto — Trecho Ecológico",
        type: "Rio",
        lat: -20.8923, lng: -49.3501,
        rating: 4.1, reviewCount: 312,
        address: "São José do Rio Preto, SP",
        distance: "448 km da capital",
        state: "SP",
        species: ["Dourado", "Curvina", "Bagre", "Lambari"],
        description: "Trecho do Rio Preto com acesso público preservado. Dourado e curvina nos poços mais profundos.",
        dicas: "Colher média no canal do rio à tarde para dourado. Isca de minhoca para bagre à noite.",
        regras: "Licença IBAMA. Respeite a vegetação nas margens.",
        preco: "Acesso gratuito.",
        googleMapsUrl: "https://maps.google.com/?q=-20.8923,-49.3501"
    },

    // ─── Piracicaba ──────────────────────────────────
    {
        id: "pesqueiro_piracicaba_mato_verde",
        name: "Pesqueiro Mato Verde — Piracicaba",
        type: "Pesqueiro",
        lat: -22.7234, lng: -47.6923,
        rating: 4.4, reviewCount: 1023,
        address: "Piracicaba, SP",
        distance: "168 km da capital",
        state: "SP",
        species: ["Tilápia", "Pacu", "Tucunaré", "Curimbatá", "Tambaqui"],
        description: "Pesqueiro muito bem avaliado em Piracicaba. Ambiente agradável com boa estrutura para grupos e famílias.",
        dicas: "Curimbatá nos afluentes do lago com isca de fundo (fubá enrolado). Tucunaré à tarde.",
        regras: "Proibido pesca noturna. Iluminação somente com autorização.",
        preco: "R$ 70–110/dia",
        googleMapsUrl: "https://maps.google.com/?q=-22.7234,-47.6923"
    },
    {
        id: "rio_piracicaba_pesca",
        name: "Rio Piracicaba — Trecho Histórico",
        type: "Rio",
        lat: -22.7412, lng: -47.6512,
        rating: 4.2, reviewCount: 445,
        address: "Piracicaba, SP",
        distance: "167 km da capital",
        state: "SP",
        species: ["Curvina", "Dourado", "Curimbatá", "Lambari", "Bagre"],
        description: "Rio Piracicaba no trecho urbano histórico. A cachoeira é ponto popular para curvina e dourado de menor porte.",
        dicas: "Curvina de jig leve abaixo da cachoeira. Curimba nas rápidas com fubá.",
        regras: "Trecho urbano — respeite as áreas de parque e esplanada.",
        preco: "Acesso gratuito.",
        googleMapsUrl: "https://maps.google.com/?q=-22.7412,-47.6512"
    },

    // ─── São Carlos ──────────────────────────────────
    {
        id: "pesqueiro_sao_carlos_santa_eudoxia",
        name: "Pesqueiro Santa Eudóxia — São Carlos",
        type: "Pesqueiro",
        lat: -21.9234, lng: -47.8823,
        rating: 4.3, reviewCount: 678,
        address: "São Carlos, SP",
        distance: "235 km da capital",
        state: "SP",
        species: ["Tilápia", "Pacu", "Tambaqui", "Tucunaré", "Bagre"],
        description: "Pesqueiro em São Carlos com clima mais ameno. Lagos bem manejados e boa diversidade de espécies.",
        dicas: "Pacu: caranguejo ou milho no fundo. Tucunaré: twister verde às primeiras horas.",
        regras: "Sem pesca noturna. Limite de 8 peixes/dia.",
        preco: "R$ 65–100/dia",
        googleMapsUrl: "https://maps.google.com/?q=-21.9234,-47.8823"
    },
    {
        id: "represa_sao_carlos_monjolinho",
        name: "Represa do Monjolinho — São Carlos",
        type: "Represa",
        lat: -21.9823, lng: -47.8512,
        rating: 4.1, reviewCount: 287,
        address: "São Carlos, SP",
        distance: "234 km da capital",
        state: "SP",
        species: ["Tucunaré", "Tilápia", "Traíra", "Lambari"],
        description: "Represa urbana de São Carlos com acesso público e pegada ambiental. Tucunaré e traíra nos camalotes.",
        dicas: "Traíra nos camalotes cedo. Tucunaré nos galhos submersos à tarde.",
        regras: "Apenas barcos sem motor. Área de lazer — cuidado com banhistas.",
        preco: "Acesso gratuito.",
        googleMapsUrl: "https://maps.google.com/?q=-21.9823,-47.8512"
    },

    // ─── Araraquara ──────────────────────────────────
    {
        id: "pesqueiro_araraquara_sul",
        name: "Pesqueiro Fontes do Jacaré — Araraquara",
        type: "Pesqueiro",
        lat: -21.7923, lng: -48.1834,
        rating: 4.4, reviewCount: 823,
        address: "Araraquara, SP",
        distance: "270 km da capital",
        state: "SP",
        species: ["Tilápia", "Pacu", "Tucunaré", "Tambaqui", "Surubim"],
        description: "Pesqueiro em Araraquara com lago especial de surubim. Peixes bem selecionados e estrutura de hotel-fazenda.",
        dicas: "Surubim de madrugada com tuvira. Pacu de manhã com milho na margem das árvores.",
        regras: "Lago do surubim: reserva antecipada obrigatória.",
        preco: "R$ 80–200/dia (surubim separado)",
        googleMapsUrl: "https://maps.google.com/?q=-21.7923,-48.1834"
    },
    {
        id: "rio_jacare_araraquara",
        name: "Rio Jacaré-Pepira — Brotas",
        type: "Rio",
        lat: -22.2834, lng: -48.1234,
        rating: 4.5, reviewCount: 1234,
        address: "Brotas, SP",
        distance: "250 km da capital",
        state: "SP",
        species: ["Dourado", "Curimbatá", "Bagre", "Lambari", "Curvina"],
        description: "Rio Jacaré-Pepira em Brotas, famosa polo de ecoturismo. Pesca leve combina com rapel e caiaque nesta região.",
        dicas: "Dourado nas corredeiras abaixo das cachoeiras. Mosca e iscas leves para curimbatá.",
        regras: "Pesca deve ser combinada com operadoras de aventura credenciadas.",
        preco: "Pacotes de pesca + aventura R$ 200–400/dia.",
        googleMapsUrl: "https://maps.google.com/?q=-22.2834,-48.1234"
    },

    // ─── Araçatuba ───────────────────────────────────
    {
        id: "pesqueiro_aracatuba_premium",
        name: "Pesqueiro Recanto do Rio — Araçatuba",
        type: "Pesqueiro",
        lat: -21.2012, lng: -50.4423,
        rating: 4.5, reviewCount: 1123,
        address: "Araçatuba, SP",
        distance: "520 km da capital",
        state: "SP",
        species: ["Tilápia", "Pacu", "Tucunaré", "Pintado", "Tambaqui"],
        description: "Pesqueiro referência em Araçatuba. Próximo ao Rio Tietê com excursões para pesca no rio inclusa em alguns pacotes.",
        dicas: "Inclua a excursão para o Tietê — pintado e dourado no canal do rio são uma outra experiência.",
        regras: "Licença IBAMA para excursão no Rio Tietê.",
        preco: "R$ 90–220/dia (excursão Tietê separada)",
        googleMapsUrl: "https://maps.google.com/?q=-21.2012,-50.4423"
    },
    {
        id: "rio_tiete_aracatuba",
        name: "Rio Tietê — Araçatuba (Represa Birigui)",
        type: "Rio",
        lat: -21.2834, lng: -50.3823,
        rating: 4.6, reviewCount: 1567,
        address: "Araçatuba, SP",
        distance: "515 km da capital",
        state: "SP",
        species: ["Dourado", "Pintado", "Curvina", "Pacu", "Cachorra"],
        description: "Trecho do Tietê em Araçatuba é considerado um dos melhores do estado para dourado e pintado. Barcos de pesca a noite toda.",
        dicas: "Dourado: corrico noturno com isca grande de 15cm. Cachorra: jig de chumbo no remanso.",
        regras: "Licença obrigatória. Pesca esportiva profissional — guia altamente recomendado.",
        preco: "Guias R$ 200–400/dia com barco.",
        googleMapsUrl: "https://maps.google.com/?q=-21.2834,-50.3823"
    },

    // ─── Presidente Prudente ──────────────────────────
    {
        id: "pesqueiro_presidente_prudente",
        name: "Pesqueiro Vale do Peixe — Pres. Prudente",
        type: "Pesqueiro",
        lat: -22.1234, lng: -51.3923,
        rating: 4.4, reviewCount: 890,
        address: "Presidente Prudente, SP",
        distance: "559 km da capital",
        state: "SP",
        species: ["Tilápia", "Pacu", "Tucunaré", "Tambaqui", "Pintado"],
        description: "Pesqueiro de grande porte em Presidente Prudente. Lagos especializados por espécie com infraestrutura completa.",
        dicas: "Lago do pintado e do pacu são os destaques. Reserve com antecedência para garantir vaga.",
        regras: "Lago do pintado: somente com isca natural e equipamento acima de 20lb.",
        preco: "R$ 80–200/dia",
        googleMapsUrl: "https://maps.google.com/?q=-22.1234,-51.3923"
    },
    {
        id: "represa_pres_prudente_lagoa",
        name: "Lagoa do Furquim — Pres. Prudente",
        type: "Represa",
        lat: -22.1012, lng: -51.4123,
        rating: 4.1, reviewCount: 356,
        address: "Presidente Prudente, SP",
        distance: "558 km da capital",
        state: "SP",
        species: ["Tucunaré", "Tilápia", "Traíra", "Lambari"],
        description: "Lagoa urbana de Presidente Prudente com acesso público. Tucunarés de tamanho razoável e traíras.",
        dicas: "Traíra nas margens vegetadas nas primeiras horas. Tucunaré com twister pequeno.",
        regras: "Área pública — respeite os horários de funcionamento.",
        preco: "Acesso gratuito.",
        googleMapsUrl: "https://maps.google.com/?q=-22.1012,-51.4123"
    },

    // ─── Ribeirão Preto (complementar) ───────────────
    {
        id: "pesqueiro_ribeirao_preto_cachoeira",
        name: "Pesqueiro Cachoeira das Araras — Riberão",
        type: "Pesqueiro",
        lat: -21.2234, lng: -47.8512,
        rating: 4.5, reviewCount: 1345,
        address: "Ribeirão Preto, SP",
        distance: "315 km da capital",
        state: "SP",
        species: ["Tilápia", "Pacu", "Tucunaré", "Tambaqui", "Catfish"],
        description: "Pesqueiro premiado de Ribeirão Preto com lago cachoeira e ambiente bem cuidado. Destaque para o saguão de pesca noturna.",
        dicas: "Pesca noturna (pacote especial): catfish e tambaqui grandes na base da cascata.",
        regras: "Pesca noturna somente com reserva antecipada e coletes obrigatórios.",
        preco: "Diurno R$ 90–130. Noturno R$ 180/pessoa.",
        googleMapsUrl: "https://maps.google.com/?q=-21.2234,-47.8512"
    },

    // ─── Campinas (complementar) ──────────────────────
    {
        id: "pesqueiro_campinas_holambra",
        name: "Pesqueiro Quinta das Rosas — Holambra",
        type: "Pesqueiro",
        lat: -22.6323, lng: -47.0512,
        rating: 4.5, reviewCount: 1189,
        address: "Holambra, SP",
        distance: "125 km da capital",
        state: "SP",
        species: ["Tilápia", "Carpa", "Pacu", "Tucunaré", "Tambaqui"],
        description: "Próximo a Holambra (cidade das flores), este pesqueiro tem ambiente encantador com carpas gigantes. Destino premium.",
        dicas: "Carpa gigante no lago especial — pellet de truta ou boillie. Exige paciência e equipamento.",
        regras: "Carpa: devolução obrigatória em qualquer tamanho.",
        preco: "R$ 80–200/dia",
        googleMapsUrl: "https://maps.google.com/?q=-22.6323,-47.0512"
    },
    {
        id: "rio_atibaia_campinas",
        name: "Rio Atibaia — Americana",
        type: "Rio",
        lat: -22.7234, lng: -47.3312,
        rating: 4.1, reviewCount: 312,
        address: "Americana, SP",
        distance: "135 km da capital",
        state: "SP",
        species: ["Dourado", "Curvina", "Curimbatá", "Lambari"],
        description: "Trecho do Rio Atibaia com corredeiras e bom potencial para dourado e curvina. Acessível pela Anhanguera.",
        dicas: "Dourado: colher pequena nas corredeiras rasas. Curimba nos fundos de pedras.",
        regras: "Licença IBAMA. Respeite a vegetação ciliar.",
        preco: "Acesso gratuito nas pontes públicas.",
        googleMapsUrl: "https://maps.google.com/?q=-22.7234,-47.3312"
    },

    // ─── Sorocaba (complementar) ──────────────────────
    {
        id: "pesqueiro_sorocaba_verde",
        name: "Pesqueiro Fazenda Verde — Sorocaba",
        type: "Pesqueiro",
        lat: -23.5012, lng: -47.3912,
        rating: 4.4, reviewCount: 956,
        address: "Sorocaba, SP",
        distance: "100 km da capital",
        state: "SP",
        species: ["Tilápia", "Pacu", "Tucunaré", "Tambaqui", "Carpa"],
        description: "Pesqueiro fazenda em Sorocaba com área de camping, trilhas e pesca. Ótimo para grupos.",
        dicas: "Carpa: boillie amanhã cedo no fundo. Pacu: ceva de caranguejo no início da tarde.",
        regras: "Camping adicional R$ 50/barraca. Fogueira somente em área designada.",
        preco: "R$ 70–100/dia",
        googleMapsUrl: "https://maps.google.com/?q=-23.5012,-47.3912"
    },

    // ─── Franca (complementar) ────────────────────────
    {
        id: "pesqueiro_franca_premium",
        name: "Pesqueiro Villa Rica — Franca",
        type: "Pesqueiro",
        lat: -20.5523, lng: -47.4012,
        rating: 4.5, reviewCount: 756,
        address: "Franca, SP",
        distance: "398 km da capital",
        state: "SP",
        species: ["Tilápia", "Pacu", "Tucunaré", "Pintado", "Tambaqui"],
        description: "Pesqueiro premium de Franca com campo de pesca esportiva e torneios mensais de tucunaré.",
        dicas: "Participe dos torneios — ótima chance de aprender técnicas novas e ganhar prêmios.",
        regras: "Redes e tarrafas proibidas. Devolução de tucunaré acima de 40cm.",
        preco: "R$ 80–130/dia",
        googleMapsUrl: "https://maps.google.com/?q=-20.5523,-47.4012"
    },
];

async function seed() {
    console.log("🚀 Adicionando spots de Bragança, Atibaia e interior paulista...\n");
    let count = 0;

    for (const spot of SPOTS) {
        const { id, ...data } = spot;
        data.dataAtualizacao = new Date().toISOString();
        await setDoc(doc(db, 'spots', id), data);
        const city = spot.address.split(',')[0];
        console.log(`✅ ${spot.name.padEnd(45)} ${spot.type} — ${city}`);
        count++;
    }

    console.log(`\n🎉 ${count} novos spots adicionados!`);
    process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
