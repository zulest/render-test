export interface IndicadorCalculado {
    fecha: string; // Fecha del cálculo
    idIndicador: number; // ID del indicador
    codigoOficina: string; // Código de la oficina
    valor: number; // Valor calculado del indicador
    componentes: Componente; // Componentes del indicador
}

interface Componente {
    numerador: number;
    denominador: number;
    detalle: {
        numerador: {
            [key: string]: number;
        };
        denominador: {
            [key: string]: number;
        };
    };
}

export interface CalculoIndicador {
    valor: number; // Valor calculado del indicador
    componentes: Componente; // Componentes del indicador
}
