import { Request, Response } from 'express';
import { IndicadoresCalculadosService } from './indicadoresCalculados.service';

export class IndicadoresCalculadosController {
    private indicadoresCalculadosService: IndicadoresCalculadosService;

    constructor() {
        this.indicadoresCalculadosService = new IndicadoresCalculadosService();
    }

    async obtenerIndicadoresCalculados(req: Request, res: Response): Promise<void> {
        try {
            console.log("[Controller] Obteniendo todos los indicadores calculados...");
            const indicadoresCalculados = await this.indicadoresCalculadosService.obtenerIndicadoresCalculados();
            res.status(200).json(indicadoresCalculados);
        } catch (error) {
            console.error("[Controller] Error al obtener los indicadores calculados", error);
            res.status(500).json({ message: 'Error al obtener los indicadores calculados' });
        }
    }

    async obtenerIndicadoresCalculadosPorOficina(req: Request, res: Response): Promise<void> {
        try {
            console.log("[Controller] Obteniendo indicadores calculados por oficina...");
            const indicadoresPorOficina = await this.indicadoresCalculadosService.obtenerIndicadoresCalculadosPorOficina();
            res.status(200).json(indicadoresPorOficina);
        } catch (error) {
            console.error("[Controller] Error al obtener los indicadores calculados por oficina", error);
            res.status(500).json({ message: 'Error al obtener los indicadores calculados por oficina' });
        }
    }
}