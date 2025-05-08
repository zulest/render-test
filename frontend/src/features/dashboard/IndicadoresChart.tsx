import { useEffect, useState } from "react";
import { ChartCard } from "../../components/dashboard/ChartCard";
import { IndicadorCalcularPeriodoResponse } from "shared/src/types/indicadores.types";
import { useCallback } from "react";

export const IndicadoresChart = () => {
    const [data, setData] = useState<IndicadorCalcularPeriodoResponse>();
    const filters = ['Último mes', 'Último trimestre', 'Último año'];
    const [selectedFilter, setSelectedFilter] = useState('Último semestre');

    const onFilterChange = useCallback((filter: string) => {
        const today = new Date();
        const startDate = new Date();

        switch (filter) {
            case 'Último mes':
                startDate.setMonth(today.getMonth() - 1);
                break;
            case 'Último trimestre':
                startDate.setMonth(today.getMonth() - 3);
                break;
            case 'Último semestre':
                startDate.setMonth(today.getMonth() - 6);
                break;
            case 'Último año':
                startDate.setFullYear(today.getFullYear() - 1);
                break;
            default:
                startDate.setFullYear(today.getFullYear() - 1); // Default to last year
        }

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
        onFilterChange(selectedFilter);
    }, [onFilterChange, selectedFilter]);

    const obtenerIndicadoresCalculados = async (inicio: string, fin: string) => {
        try {
            const response = await fetch(`/api/indicadores/calcular-periodo/?oficina=TABACUNDO&fechaInicio=${inicio}&fechaFin=${fin}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }



    return (
        <div className="grid grid-cols-1 gap-6">
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
                filters={filters}
                onFilterChange={setSelectedFilter}
            />
        </div>
    );
}