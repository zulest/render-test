import { useState } from 'react';
import { VoiceRecorder } from './VoiceRecorder';
import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI;

const initializeGemini = (apiKey: string) => {
    genAI = new GoogleGenerativeAI(apiKey);
};

export const InputAudio: React.FC<{ onInput: (text: string) => void }> = ({ onInput }) => {
    const GEMINI_API_KEY = "AIzaSyDjw_g1kQZAofU-DOsdsCjgkf3_06R2UEk";
    const [isProcessing, setIsProcessing] = useState(false);

    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
        if (!genAI) {
            throw new Error("Gemini API not initialized. Please call initializeGemini first.");
        }

        try {
            // Convert blob to base64
            const base64Audio = await blobToBase64(audioBlob);

            // Generate transcription
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const result = await model.generateContent([
                'Please transcribe this audio file accurately.',
                {
                    inlineData: {
                        mimeType: 'audio/wav',
                        data: base64Audio.split(',')[1]
                    }
                },
            ]);

            return result.response.text();
        } catch (error) {
            console.error('Error transcribing audio:', error);
            throw error;
        }
    };

    const handleRecordingComplete = async (audioBlob: Blob) => {
        console.log("gravacion terminada", GEMINI_API_KEY);
        setIsProcessing(true);
        try {
            // Initialize Gemini API with your API key
            // In production, this should be stored in environment variables
            initializeGemini(GEMINI_API_KEY);
            console.log("inicializando modelo", GEMINI_API_KEY);
            const text = await transcribeAudio(audioBlob);
            console.log("texto", text);
            onInput(text);
        } catch (error) {
            onInput(error instanceof Error ? error.message : 'Failed to process voice command');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div>
            {isProcessing ? <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
            </div> : <VoiceRecorder onRecordingComplete={handleRecordingComplete} />}
        </div>

    );
};