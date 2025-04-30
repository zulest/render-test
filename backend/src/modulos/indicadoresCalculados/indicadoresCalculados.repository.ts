import { BaseRepository } from "../../base/base.repository";
import { getSequelize } from "../../database/database.connection";
import { TABLA_INDICADORES_CALCULADOS, TABLA_INDICADORES_FINANCIEROS } from "../../database/database.constants";
import { IndicadorCalculado } from "./indicadoresCalculados.model";

export class IndicadoresCalculadosRepository extends BaseRepository<IndicadorCalculado> {
    private sequelize = getSequelize(); // Obtener la instancia de Sequelize

    async obtenerIndicadoresCalculados(): Promise<IndicadorCalculado[]> {
        const indicadoresCalculados = await this.sequelize.models.IndicadorCalculado.findAll();
        return indicadoresCalculados as IndicadorCalculado[]; // Convertir a IndicadorCalculado[]
    }

    async obtenerIndicadoresCalculadosPorOficina(): Promise<any[]> {
        const indicadoresFinancierosTable = `\`${TABLA_INDICADORES_FINANCIEROS}\``;
        const tableName = `\`${TABLA_INDICADORES_CALCULADOS}\``;
        const codigoOficina = 'CALDERON';

        const query = `
        SELECT
            ic.idIndicador,
            ic.fecha,
            ic.valor,
            fi.nombre AS nombreIndicador,
            fi.umbrales AS umbralesIndicador
        FROM ${tableName} AS ic
        INNER JOIN ${indicadoresFinancierosTable} AS fi
            ON ic.idIndicador = fi.id
        WHERE ic.codigoOficina = '${codigoOficina}'
    `;

        // const query = `
        //     SELECT idIndicador, fecha, valor
        //     FROM ${tableName}
        //     WHERE codigoOficina = '${codigoOficina}'
        // `;
        const indicadoresPorOficina = await this.sequelize.query(query);
        console.log("[Repository] Transformando datos...", indicadoresPorOficina.length);

        const datosCompletos = indicadoresPorOficina.flatMap((resultado: any) =>
            resultado.map((item: any) => ({
                idIndicador: item.idIndicador,
                nombreIndicador: item.nombreIndicador,
                umbralesIndicador: item.umbralesIndicador,
                fecha: item.fecha,
                valor: item.valor,
            }))
        );
        const datosTransformados = this.transformarDatos(datosCompletos); // Transformar los datos
        console.log("[Repository] Datos transformados: ", datosTransformados);
        return datosTransformados; // Retornar solo los resultados
    }

    transformarDatos(datos: any[]): any[] {
        const resultado: any = {};
        datos.forEach(item => {
            const fecha = new Date(item.fecha).toLocaleDateString('es-ES', { month: 'short' });
            if (!resultado[fecha]) {
                resultado[fecha] = { month: fecha };
            }
            resultado[fecha][`${item.nombreIndicador}`] = parseFloat(item.valor);
            resultado[fecha][`color`] = this.obtenerColorPorUmbral(item.valor, item.umbralesIndicador);
        });
        return Object.values(resultado);
    }

    obtenerColorPorUmbral(valor: number, umbralesJson: string): string | null {
        try {
            const umbrales = JSON.parse(umbralesJson)?.umbrales;
            if (!umbrales || !Array.isArray(umbrales)) {
                return null;
            }

            for (const umbral of umbrales) {
                console.log('umbral', umbral, "valor", valor);
                if (valor >= umbral.valorMin && valor <= umbral.valorMax) {
                    return umbral.color;
                }
            }
            return "red"; // Si el valor no cae en ningún umbral
        } catch (error) {
            console.error("Error al parsear o procesar los umbrales:");
            return "green";
        }
    }
}