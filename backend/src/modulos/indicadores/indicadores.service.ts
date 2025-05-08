import { Indicador } from './indicadores.model';
import { IndicadoresRepository } from './indicadores.repository';

export class IndicadoresService {
    private indicadoresRepository: IndicadoresRepository;

    constructor() {
        this.indicadoresRepository = new IndicadoresRepository();
    }

    // Obtener todos los indicadores financieros
    async obtenerTodos(): Promise<Indicador[]> {
        console.log('[service] Obteniendo todos los indicadores financieros...');
        const indicadores = await this.indicadoresRepository.obtenerTodos();
        return indicadores
    }

    // Obtener un indicador financiero por ID
    async obtenerPorId(id: string): Promise<Indicador | null> {
        return await this.indicadoresRepository.obtenerPorId(id);
    }

    // Crear un nuevo indicador financiero
    async crear(indicador: Indicador): Promise<Indicador> {
        return await this.indicadoresRepository.crear(indicador);
    }

    // Actualizar un indicador financiero existente
    async actualizar(id: string, datosActualizados: Indicador): Promise<Indicador | null> {
        return await this.indicadoresRepository.actualizar(id, datosActualizados);
    }

    // Eliminar un indicador financiero
    async eliminar(id: string): Promise<boolean> {
        return await this.indicadoresRepository.eliminar(id);
    }

    async obtenerIndicadoresCalculados(oficina: string) {
        return await this.indicadoresRepository.obtenerIndicadoresCalculados(oficina);
    }

    async obtenerPromedioIndicadoresOficina(oficina: string, fechaInicio: string, fechaFin: string) {
        return await this.indicadoresRepository.obtenerPromedioIndicadoresOficina(oficina, fechaInicio, fechaFin);
    }
}