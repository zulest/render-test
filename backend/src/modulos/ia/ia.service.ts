import { GoogleGenAI, Type } from '@google/genai';
import { Indicador } from '../indicadores/indicadores.model';
import { GoogleGenerativeAI } from "@google/generative-ai";

export class IaService {
    private ai: GoogleGenAI;

    constructor() {
        this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }

    convertToBase64 = (buffer: Buffer<ArrayBufferLike>): Promise<string> => {
        return new Promise((resolve, reject) => {
            try {
                const base64String = buffer.toString('base64');
                resolve(base64String);
            } catch (error) {
                reject(error);
            }
        });
    };

    transcribeAudio = async (base64Audio: string): Promise<string> => {
        try {
            // // Generate transcription
            // const apiKey = process.env.GEMINI_API_KEY;
            // if (!apiKey) {
            //     throw new Error('GEMINI_API_KEY is not defined in the environment variables.');
            // }
            // const genAI = new GoogleGenerativeAI(apiKey);
            // const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            // const result = await model.generateContent([
            //     'Please transcribe this audio file accurately.',
            //     {
            //         inlineData: {
            //             mimeType: 'audio/mp3',
            //             data: base64Audio
            //         }
            //     },
            // ]);

            // console.log("Transcripción de audio:", result.response.text());
            // return result.response.text();


            const result = await this.ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: [
                    'Please transcribe this audio file accurately.',
                    {
                        inlineData: {
                            mimeType: 'audio/mp3',
                            data: base64Audio
                        }
                    },
                ],
            });

            return result.text || 'No se pudo transcribir el audio.';
        } catch (error) {
            console.error('Error transcribing audio:', error);
            throw error;
        }
    };

    async obtenerRespuesta(message: string | undefined, audioBlob: Buffer<ArrayBufferLike> | null): Promise<string> {
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

        let contents;

        if (audioBlob) {
            const base64Audio = await this.convertToBase64(audioBlob);
            contents = [
                '',
                {
                    inlineData: {
                        mimeType: 'audio/mp3',
                        data: base64Audio
                    }
                },
            ]
        } else {
            contents = [message || ""];
        }

        // Send request with function declarations
        const response = await this.ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: contents,
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

        console.log("Respuesta de Gemini:", response.text);
        console.log("function calls:", response.functionCalls);
        return response.text || 'No se encontró una respuesta adecuada.';
    }
}