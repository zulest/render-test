import { GoogleGenAI, Type } from '@google/genai';
import { Indicador } from '../indicadores/indicadores.model';

export class IaService {
    private ai: GoogleGenAI;

    constructor() {
        this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }

    async obtenerRespuesta(message: string): Promise<string> {
        // Define the function declarations
        const fetchIndicatorNamesFunctionDeclaration = {
            name: 'fetch_indicator_names',
            description: 'Fetches a list of all indicator names from the database.',
            parameters: {
                type: Type.OBJECT,
                properties: {},
                required: [],
            },
        };

        const fetchIndicatorIdsFunctionDeclaration = {
            name: 'fetch_indicator_ids',
            description: 'Fetches a list of all indicator IDs from the database.',
            parameters: {
                type: Type.OBJECT,
                properties: {},
                required: [],
            },
        };

        // Send request with function declarations
        const response = await this.ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: message,
            config: {
                tools: [{
                    functionDeclarations: [
                        fetchIndicatorNamesFunctionDeclaration,
                        fetchIndicatorIdsFunctionDeclaration,
                    ],
                }],
            },
        });

        // Check for function calls in the response
        if (response.functionCalls && response.functionCalls.length > 0) {
            const functionCall = response.functionCalls[0];
            if (functionCall.name === 'fetch_indicator_names') {
                // Fetch indicator names from the database
                console.log("obteniendo nombre de indicadores ....")
                const indicadores = await Indicador.findAll({ attributes: ['nombre'] });
                const nombres = indicadores.map(indicador => indicador.nombre);
                return `Lista de indicadores: ${nombres.join(', ')}`;
            } else if (functionCall.name === 'fetch_indicator_ids') {
                console.log("obteniendo ids de indicadores ....")
                // Fetch indicator IDs from the database
                const indicadores = await Indicador.findAll({ attributes: ['id'] });
                const ids = indicadores.map(indicador => indicador.id);
                return `Lista de IDs de indicadores: ${ids.join(', ')}`;
            }
        }

        return response.text || 'No se encontró una respuesta adecuada.';
    }
}