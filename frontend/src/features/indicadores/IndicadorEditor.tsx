import { useState } from "react";
import { IndicadorResponse } from "shared/src/types/indicadores.types";

interface IndicadorEditorProps {
    indicador?: IndicadorResponse | null;
    onCancel: () => void;
    onSubmit: (indicador: IndicadorResponse) => void;
}

export const IndicadorEditor: React.FC<IndicadorEditorProps> = ({indicador, onCancel, onSubmit}) => {
    const [nombre, setNombre] = useState(indicador?.nombre || "");
    const [descripcion, setDescripcion] = useState(indicador?.descripcion || "");
    const [meta, setMeta] = useState(indicador?.meta || 0);
    const [mayorEsMejor, setMayorEsMejor] = useState(indicador?.mayorEsMejor || false);
    const [estaActivo, setEstaActivo] = useState(indicador?.estaActivo || false);
    const [numerador, setNumerador] = useState(indicador?.numerador || { componentes: [] });
    const [denominador, setDenominador] = useState(indicador?.denominador || { componentes: [] });
    const [numeradorAbsoluto, setNumeradorAbsoluto] = useState(indicador?.numeradorAbsoluto || false);
    const [denominadorAbsoluto, setDenominadorAbsoluto] = useState(indicador?.denominadorAbsoluto || false);
    const [umbrales, setUmbrales] = useState(indicador?.umbrales || {
        umbrales: [],
        configuracion: {
            decimales: 2,
            invertido: false,
            mostrarTendencia: true,
            formatoVisualizacion: "decimal"
        },
        alerta: 0,
        advertencia: 0
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const indicadorData: IndicadorResponse = {
            id: indicador?.id || 0,
            nombre,
            descripcion,
            meta,
            mayorEsMejor,
            estaActivo,
            umbrales,
            estaEnPantallaInicial: indicador?.estaEnPantallaInicial || false,
            ordenMuestra: indicador?.ordenMuestra || 0,
            numerador,
            denominador,
            numeradorAbsoluto,
            denominadorAbsoluto
        };
        onSubmit(indicadorData);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">{indicador ? "Editar" : "Crear"} Indicador</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta</label>
                    <input
                        type="number"
                        value={meta}
                        onChange={(e) => setMeta(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex items-center">
                        <input
                            id="mayorEsMejor"
                            type="checkbox"
                            checked={mayorEsMejor}
                            onChange={(e) => setMayorEsMejor(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="mayorEsMejor" className="ml-2 block text-sm text-gray-700">
                            Mayor es mejor
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="estaActivo"
                            type="checkbox"
                            checked={estaActivo}
                            onChange={(e) => setEstaActivo(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="estaActivo" className="ml-2 block text-sm text-gray-700">
                            Activo
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Numerador</label>
                        <input
                            type="text"
                            value={JSON.stringify(numerador)}
                            onChange={(e) => setNumerador(JSON.parse(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="mt-2">
                            <input
                                id="numeradorAbsoluto"
                                type="checkbox"
                                checked={numeradorAbsoluto}
                                onChange={(e) => setNumeradorAbsoluto(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="numeradorAbsoluto" className="ml-2 block text-sm text-gray-700">
                                Absoluto
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Denominador</label>
                        <input
                            type="text"
                            value={JSON.stringify(denominador)}
                            onChange={(e) => setDenominador(JSON.parse(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="mt-2">
                            <input
                                id="denominadorAbsoluto"
                                type="checkbox"
                                checked={denominadorAbsoluto}
                                onChange={(e) => setDenominadorAbsoluto(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="denominadorAbsoluto" className="ml-2 block text-sm text-gray-700">
                                Absoluto
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {indicador ? "Actualizar" : "Crear"}
                    </button>
                </div>
            </form>
        </div>
    );
};