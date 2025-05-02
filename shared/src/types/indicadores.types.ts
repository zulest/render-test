export interface IndicadorCalcularPeriodoResponse {
    indicadores: IndicadorColor[];
    indicadoresCalculados: IndicadorCalcularPeriodo[];
}

export interface IndicadorColor {
    id: number;
    nombre: string;
    color: string;
}


export interface IndicadorCalcularPeriodo {
    [key: string]: string | number;
}