import { useEffect, useState } from "react";
import { ChartCard } from "../../components/dashboard/ChartCard";
import { IndicadorCalcularPeriodoResponse } from "shared/src/types/indicadores.types";
import { useCallback } from "react";

export const IndicadoresChart = () => {
    const [data, setData] = useState<IndicadorCalcularPeriodoResponse | null>(null);

    const onFilterChange = useCallback(() => {
        const today = new Date();
        const startDate = new Date();
        
        // Filtrar por semestre por defecto
        startDate.setMonth(today.getMonth() - 6);

        // Format dates as YYYY-MM-DD
        const formatDate = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const fechaInicioStr = formatDate(startDate);
        const fechaFinStr = formatDate(today);
        console.log(fechaInicioStr, fechaFinStr);

        obtenerIndicadoresCalculados(fechaInicioStr, fechaFinStr);
    }, [])

    useEffect(() => {
        onFilterChange();
    }, [onFilterChange]);

    const obtenerIndicadoresCalculados = async (inicio: string, fin: string) => {
        try {
            const response = await fetch(`/api/indicadores/calcular-periodo/?oficina=TABACUNDO&fechaInicio=${inicio}&fechaFin=${fin}`);
            const result = await response.json();
            console.log("result", result);
            if(result.error){
                throw new Error(result.error);
            }
            setData(result);
        } catch (error) {
            setData(null);
            console.error("Error fetching data:", error);
        }
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {data === undefined ? (
                <p className="text-center">Cargando...</p>
            ) : data === null ? (
                <p className="text-center text-red-600">Error al obtener los datos</p>
            ) : (
            <ChartCard
                title="Indicadores Financieros"
                subTitle="Evolución de indicadores clave (últimos 6 meses)"
                type="line"
                data={data?.indicadoresCalculados ? data.indicadoresCalculados : []}
                xDataKey="month"
                series={data ? data.indicadores?.map(indicador => ({
                    dataKey: indicador.nombre, // Convert 'id' to string for dataKey
                    color: indicador.color,
                    name: indicador.nombre,
                })) : []}
                height={350}
            />)}
        </div>
    );
}