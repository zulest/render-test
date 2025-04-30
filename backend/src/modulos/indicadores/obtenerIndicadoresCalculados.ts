import { TABLA_CUENTACONTABLE, TABLA_DIVISION, TABLA_SALDOCONTABLE } from "../../database/database.constants";
import { SaldoContable } from "../saldos/saldos.model";
import { SaldosRepository } from "../saldos/saldos.repository";

export const obtenerIndicadoresCalculados = (codigoOficina: string) => {
    const fechas = obtenerFechas();
    for (const fecha of fechas) {
        calcularIndicadoresParaFecha(fecha, codigoOficina);
    }
}

const calcularIndicadoresParaFecha = async (fecha: Date, codigoOficina: string) => {
    const fechaStr = fecha.toISOString().split('T')[0];
    console.log(`Calculando indicadores para fecha: ${fechaStr} (todas las oficinas)`);

    try {
        // Implementación optimizada directamente en el script
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
          sc.FECHA = :fecha AND
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

        // Agrupar saldos por oficina para procesar cada oficina por separado
        const saldosPorOficina: any = {};

        // Organizar los saldos por código de oficina
        todosSaldos.forEach(saldo => {
            // Usar el código de oficina del saldo
            const codigoOficina = saldo.codigoOficina;
            console.log("codigo oficina", codigoOficina);
        });
    } catch (error) {
        console.error(`Error al calcular indicadores para la fecha ${fechaStr}:`, error);
    }
}



const obtenerFechas = (): Date[] => {
    // Definir el rango de fechas para calcular los indicadores (del 1 de enero al 15 de enero de 2025)
    const fechaInicio = new Date('2025-01-01');
    const fechaFin = new Date('2025-01-08');
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