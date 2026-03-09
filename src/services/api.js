// Mock API Service to be replaced with real endpoints

// Fetch current user location and weather
export const fetchWeatherData = async (lat, lng) => {
    // TODO: Integrate OpenWeatherMap or similar
    return {
        temp: 28,
        condition: "Sunny",
        description: "Clear sky",
        wind: "8 km/h NE",
        pressure: "1013 hPa ↑",
        moon: "Nova"
    };
};

// Fetch Solunar Data
export const fetchSolunarData = async (lat, lng, date) => {
    // TODO: Integrate solunar API
    return {
        rating: 78,
        hours: [
            { label: "4h", value: 20 }, { label: "5h", value: 45 }, { label: "6h", value: 82, active: true },
            { label: "7h", value: 91, active: true }, { label: "8h", value: 78, active: true }, { label: "9h", value: 55 },
            { label: "10h", value: 35 }, { label: "11h", value: 22 }, { label: "12h", value: 15 },
            { label: "13h", value: 18 }, { label: "14h", value: 25 }, { label: "15h", value: 40 },
            { label: "16h", value: 65 }, { label: "17h", value: 88, active: true }, { label: "18h", value: 72, active: true },
            { label: "19h", value: 45 }, { label: "20h", value: 30 },
        ]
    };
};

// Fetch fishing regulation rules
export const fetchRegulations = async (lat, lng, date) => {
    // TODO: Query Firebase for local fishing rules
    return {
        status: "green", // green | yellow | red
        allowedSpecies: ["Tucunaré >= 35cm", "Traíra >= 25cm", "Tilápia (sem limite)", "Pacu >= 40cm"]
    };
};

export const fetchSpeciesList = async () => {
    // TODO: fetch from Firebase equivalent of SPECIES
    return [];
}

export const analyzeFishImage = async (imageBlob) => {
    // TODO: Send to AI model for classification
    return {
        confidence: 0.94,
        id: 1, // ID of species
    }
}

export const saveCatch = async (catchData) => {
    // TODO: Save to Firebase RTDB/Firestore
    return { success: true, id: Date.now() };
}
