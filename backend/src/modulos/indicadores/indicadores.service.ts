import { Indicador } from './indicadores.model';
import { IndicadoresRepository } from './indicadores.repository';

export class IndicadoresService {
    private indicadoresRepository: IndicadoresRepository;

    constructor() {
        this.indicadoresRepository = new IndicadoresRepository(Indicador);
    }

    // Obtener todos los indicadores financieros
    async obtenerTodos(): Promise<any[]> {
        console.log('[service] Obteniendo todos los indicadores financieros...');
        return await this.indicadoresRepository.obtenerTodos();
    }

    // Obtener un indicador financiero por ID
    async obtenerPorId(id: string): Promise<any | null> {
        return await this.indicadoresRepository.obtenerPorId(id);
    }

    // Crear un nuevo indicador financiero
    async crear(indicador: any): Promise<any> {
        return await this.indicadoresRepository.crear(indicador);
    }

    // Actualizar un indicador financiero existente
    async actualizar(id: string, datosActualizados: any): Promise<any | null> {
        return await this.indicadoresRepository.actualizar(id, datosActualizados);
    }

    // Eliminar un indicador financiero
    async eliminar(id: string): Promise<boolean> {
        return await this.indicadoresRepository.eliminar(id);
    }
}