import { Request, Response } from 'express';
import { IndicadoresService } from './indicadores.service';

export class IndicadoresController {
    private indicadoresService: IndicadoresService;

    constructor() {
        this.indicadoresService = new IndicadoresService();
    }

    // Obtener todos los indicadores financieros
    async obtenerIndicadores(req: Request, res: Response): Promise<void> {
        try {
            console.log('[controller] Obteniendo todos los indicadores financieros...');
            const indicadores = await this.indicadoresService.obtenerTodos();
            res.status(200).json(indicadores);
        } catch (error) {
            console.error("[controller] Error al obtener los indicadores financieros:", error);
            res.status(500).json({ message: 'Error al obtener los indicadores financieros', error });
        }
    }

    // Obtener un indicador financiero por ID
    async obtenerIndicadorPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const indicador = await this.indicadoresService.obtenerPorId(id);
            if (!indicador) {
                res.status(404).json({ message: 'Indicador no encontrado' });
            } else {
                res.status(200).json(indicador);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el indicador financiero', error });
        }
    }

    // Crear un nuevo indicador financiero
    async crearIndicador(req: Request, res: Response): Promise<void> {
        try {
            const nuevoIndicador = req.body;
            const indicadorCreado = await this.indicadoresService.crear(nuevoIndicador);
            res.status(201).json(indicadorCreado);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el indicador financiero', error });
        }
    }

    // Actualizar un indicador financiero existente
    async actualizarIndicador(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            console.log("indicador a actualizar", id)
            const datosActualizados = req.body;
            console.log("datos actualizados", datosActualizados)
            const indicadorActualizado = await this.indicadoresService.actualizar(id, datosActualizados);
            console.log("indicador actualizado", indicadorActualizado)
            if (!indicadorActualizado) {
                res.status(404).json({ message: 'Indicador no encontrado' });
            } else {
                res.status(200).json(indicadorActualizado);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el indicador financiero', error });
        }
    }

    // Eliminar un indicador financiero
    async eliminarIndicador(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const indicadorEliminado = await this.indicadoresService.eliminar(id);
            if (!indicadorEliminado) {
                res.status(404).json({ message: 'Indicador no encontrado' });
            } else {
                res.status(200).json({ message: 'Indicador eliminado correctamente' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el indicador financiero', error });
        }
    }

    async obtenerPromedioIndicadoresOficina(req: Request, res: Response): Promise<void> {
        try {
            const oficina = req.query["oficina"];
            const fechaInicio = req.query["fechaInicio"];
            const fechaFin = req.query["fechaFin"];
            const promedioIndicadores = await this.indicadoresService.obtenerPromedioIndicadoresOficina(oficina as string, fechaInicio as string, fechaFin as string);
            res.status(200).json(promedioIndicadores);
        } catch (error) {
            console.error("[controller] Error al obtener el promedio de indicadores:", error);
            res.status(500).json({ message: 'Error al obtener los indicadores calculados', error });
        }
    }
}