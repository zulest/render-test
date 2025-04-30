import { IndicadorCalculado } from "./indicadoresCalculados.model";
import { IndicadoresCalculadosRepository } from "./indicadoresCalculados.repository";

export class IndicadoresCalculadosService {
    private indicadoresCalculadosRepository: IndicadoresCalculadosRepository;

    constructor() {
        this.indicadoresCalculadosRepository = new IndicadoresCalculadosRepository(IndicadorCalculado);
    }

    async obtenerIndicadoresCalculados(): Promise<IndicadorCalculado[]> {
        console.log('[service] Obteniendo todos los indicadores calculados...');
        return await this.indicadoresCalculadosRepository.obtenerIndicadoresCalculados();
    }

    async obtenerIndicadoresCalculadosPorOficina(): Promise<any[]> {
        console.log('[service] Obteniendo indicadores calculados por oficina...');
        return await this.indicadoresCalculadosRepository.obtenerIndicadoresCalculadosPorOficina();
    }

}