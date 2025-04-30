import { getSequelize } from "../../database/database.connection";
import { BaseRepository } from "../../base/base.repository";
import { Sequelize, QueryTypes } from "sequelize"; // Importar Sequelize y QueryTypes
import { SaldoContable } from "./saldos.model"; // Asegúrate de que esta clase exista y esté correctamente importada

interface SaldoResult {
    fecha: string | Date;
    nombreOficina: string;
    codigoCuentaContable: string;
    nombreCuentaContable: string;
    saldo: string;
    codigoOficina: string;
}

export class SaldosRepository {
    private sequelize = getSequelize(); // Obtener la instancia de Sequelize

    /**
     * Obtiene los saldos contables utilizando una consulta personalizada
     * @param {string} queryString - Consulta SQL
     * @param {Object} parametros - Parámetros para la consulta
     * @returns {Promise<Array<SaldoContable>>} Lista de saldos contables
     */
    async obtenerSaldosPorQuery(queryString: string, parametros: Record<string, string>): Promise<Array<SaldoContable>> {
        try {
            // Ejecutar la consulta personalizada directamente
            console.log('Ejecutando consulta SQL:', queryString);
            console.log('Con parámetros:', parametros);

            const results: SaldoResult[] = await this.sequelize.query(queryString, {
                replacements: parametros,
                type: QueryTypes.SELECT,
                raw: true
            });

            console.log('Resultados obtenidos (tipo):', typeof results, 'es array:', Array.isArray(results));
            console.log('Resultados obtenidos (cantidad):', Array.isArray(results) ? results.length : 'no es array');

            // Convertir los resultados a objetos SaldoContable
            if (Array.isArray(results) && results.length > 0) {
                return results.map(result => {

                    return new SaldoContable(
                        result.fecha, // Ya viene formateada como YYYY-MM-DD
                        result.nombreOficina,
                        result.codigoCuentaContable,
                        result.nombreCuentaContable,
                        parseFloat(result.saldo),
                        result.codigoOficina
                    );
                });
            } else {
                console.log('No se encontraron resultados');
                return [];
            }
        } catch (error: any) {
            console.error('Error al ejecutar consulta personalizada:', error);
            throw new Error(`Error al ejecutar consulta personalizada: ${error.message}`);
        }
    }
}