import { Request, Response } from 'express';
import { ReportesService } from './reportes.service';

export class ReportesController {
    private reportesService: ReportesService;
    constructor() {
        this.reportesService = new ReportesService();
    }

    async obtenerConfiguracionesActivas(req: Request, res: Response): Promise<void> {
        try {
            const configuraciones = await this.reportesService.obtenerConfiguracionesActivas();
            res.status(200).json(configuraciones);
        } catch (error) {
            console.error('Error fetching configuraciones activas:', error);
            res.status(500).json({ error: 'Error fetching configuraciones activas' });
        }
    }
}
