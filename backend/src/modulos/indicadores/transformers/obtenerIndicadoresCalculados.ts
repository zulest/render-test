import { TABLA_CUENTACONTABLE, TABLA_DIVISION, TABLA_SALDOCONTABLE } from "../../../database/database.constants";
import { SaldosRepository } from "../../saldos/saldos.repository";
import { calcularIndicador } from "./calcularIndicador";
import { Indicador } from "../indicadores.model";
import { CalculoIndicador, IndicadorCalculado } from "../interfaces/IndicadorCalculado.interface";

export const obtenerIndicadoresCalculados = async (codigoOficina: string, indicadores: Indicador[], inicio?: string, fin?: string) => {
    const fechas = obtenerFechasMensuales(inicio, fin);
    const indicadoresPorFecha: { [key: string]: IndicadorCalculado[] } = {};
    for (const fecha of fechas) {
        const indicadoresCalculados = await calcularIndicadoresParaFecha(fecha, codigoOficina, indicadores);
        if (indicadoresCalculados) {
            indicadoresPorFecha[fecha.toISOString().split('T')[0]] = indicadoresCalculados;
        }
    }

    return indicadoresPorFecha;
}



const calcularIndicadoresParaFecha = async (fecha: Date, codigoOficina: string, indicadores: Indicador[]): Promise<IndicadorCalculado[] | undefined> => {
    const fechaStr = fecha.toISOString().split('T')[0];
    console.log(`Calculando indicadores para fecha: ${fechaStr} ${codigoOficina}`);

    try {
        // Implementación optimizada directamente en el scriptj
        console.log(`Obteniendo todos los saldos para la fecha ${fechaStr}`);

        // Filtrar los saldos solo para la oficina especificada
        if (!codigoOficina) {
            throw new Error("El código de oficina es obligatorio.");
        }
        console.log(`Filtrando saldos para la oficina con código: ${codigoOficina}`);

        // Crear una consulta personalizada para obtener los saldos de la oficina especificada en una fecha
        const queryString = `
        SELECT Date(sc.FECHA) as fecha, d1.NOMBRE as nombreOficina, d1.CODIGO as codigoOficina, 
          d.CODIGO as codigoCuentaContable, d.NOMBRE as nombreCuentaContable, 
          CASE WHEN cc.ESDEUDORA = 1 THEN sc.SALDOINICIAL + sc.TOTALDEBITO - sc.TOTALCREDITO 
               ELSE -1 * (sc.SALDOINICIAL + sc.TOTALDEBITO - sc.TOTALCREDITO) END as saldo
        FROM 
          \`${TABLA_SALDOCONTABLE}\` sc
          INNER JOIN \`${TABLA_CUENTACONTABLE}\` cc 
            ON cc.SECUENCIALDivision = sc.SECUENCIALCUENTACONTABLE
          INNER JOIN \`${TABLA_DIVISION}\` d 
            ON d.secuencial = cc.secuencialdivision
          INNER JOIN \`${TABLA_DIVISION}\` d1 
            ON d1.secuencial = sc.SECUENCIALDIVISIONORGANIZACION
        WHERE 
          YEAR(sc.FECHA) = YEAR(:fecha) AND
          MONTH(sc.FECHA) = MONTH(:fecha) AND
          d1.CODIGO = :codigoOficina AND
          cc.ESTAACTIVA = 1
          `;

        const saldosRepository = new SaldosRepository();// Instancia del repositorio de saldos
        // Obtener todos los saldos para la fecha especificada
        const todosSaldos = await saldosRepository.obtenerSaldosPorQuery(queryString, { fecha: fechaStr, codigoOficina: codigoOficina });

        if (!todosSaldos || todosSaldos.length === 0) {
            console.log(`No hay saldos para fecha: ${fechaStr}`);
            return;
        }
        console.log(`Se encontraron ${todosSaldos.length} saldos totales para la fecha ${fechaStr}`);

        const indicadoresCalculados: IndicadorCalculado[] = [];
        indicadores.forEach(indicador => {
            const resultado: CalculoIndicador = calcularIndicador(indicador, todosSaldos);

            // Crear objeto de indicador calculado
            const indicadorCalculado: IndicadorCalculado = {
                fecha: fechaStr,
                idIndicador: indicador.id,
                codigoOficina: codigoOficina,
                valor: resultado.valor,
                componentes: resultado.componentes
            };
            indicadoresCalculados.push(indicadorCalculado);
        });
        return indicadoresCalculados;
    } catch (error) {
        console.error(`Error al calcular indicadores para la fecha ${fechaStr}:`, error);
        return;
    }
}


const obtenerFechas = (inicio?: string, fin?: string): Date[] => {
    const fechaInicio = inicio ? new Date(inicio) : new Date("2015-01-01");
    const fechaFin = fin ? new Date(fin) : new Date();
    const fechas = [];

    // Generar array de fechas
    let fechaActual = new Date(fechaInicio);
    while (fechaActual <= fechaFin) {
        fechas.push(new Date(fechaActual));
        fechaActual.setDate(fechaActual.getDate() + 1);
    }
    console.log(`Se calcularán indicadores para ${fechas.length} fechas: ${fechas.map(f => f.toISOString().split('T')[0]).join(', ')}`);
    return fechas;
}

const obtenerFechasMensuales = (inicio?: string, fin?: string): Date[] => {
    const fechaInicio = inicio ? new Date(inicio) : new Date("2015-01-01");
    const fechaFin = fin ? new Date(fin) : new Date();
    const fechas = [];

    // Asegurarnos de que la fecha de inicio sea el primer día del mes
    let fechaActual = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), 1);

    while (fechaActual <= fechaFin) {
        fechas.push(new Date(fechaActual));

        // Avanzar al primer día del siguiente mes
        fechaActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 1);
    }

    console.log(`Se calcularán indicadores para ${fechas.length} meses: ${fechas.map(f => f.toISOString().split('T')[0]).join(', ')}`);
    return fechas;
}