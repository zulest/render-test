import { BaseRepository } from "../../base/base.repository";
import { getSequelize } from "../../database/database.connection";
import { Indicador } from "./indicadores.model";

export class IndicadoresRepository extends BaseRepository<Indicador> {
    private sequelize = getSequelize(); // Obtener la instancia de Sequelize


    private indicadores: Indicador[] = []; // Simulación de una base de datos en memoria

    // Obtener todos los indicadores financieros
    async obtenerTodos(): Promise<Indicador[]> {
        console.log('[repository] Obteniendo todos los indicadores financieros...');
        try {
            const indicadores = await this.sequelize.models.Indicador.findAll();
            return indicadores as Indicador[]; // Convertir a Indicador[]
        } catch (error) {
            console.error("[repository] Error al obtener todos los indicadores:", error);
            throw error;
        }
    }

    // Obtener un indicador financiero por ID
    async obtenerPorId(id: string): Promise<Indicador | null> {
        const indicador = this.indicadores.find(ind => ind.id === Number(id));
        return indicador || null;
    }

    // Crear un nuevo indicador financiero
    async crear(indicador: Indicador): Promise<Indicador> {
        const { id, ...resto } = indicador; // Exclude 'id' from the input object
        const nuevoIndicador: Indicador = Object.assign(new Indicador(), { id: this.indicadores.length + 1, ...resto });
        this.indicadores.push(nuevoIndicador);
        return nuevoIndicador;
    }

    // Actualizar un indicador financiero existente
    async actualizar(id: string, datosActualizados: Partial<Indicador>): Promise<Indicador | null> {
        const index = this.indicadores.findIndex(ind => ind.id === Number(id));
        if (index === -1) {
            return null;
        }
        this.indicadores[index] = Object.assign(new Indicador(), { ...this.indicadores[index], ...datosActualizados });
        return this.indicadores[index];
    }

    // Eliminar un indicador financiero
    async eliminar(id: string): Promise<boolean> {
        const index = this.indicadores.findIndex(ind => ind.id === Number(id));
        if (index === -1) {
            return false;
        }
        this.indicadores.splice(index, 1);
        return true;
    }
}