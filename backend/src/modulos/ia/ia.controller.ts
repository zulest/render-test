import { Request, Response } from 'express';
import { IaService } from './ia.service';


export class IaController {
    private iaService: IaService;

    constructor() {
        this.iaService = new IaService();
    }

    async obtenerRespuesta(req: Request, res: Response) {
        const { message } = req.body;
        try {
            const respuesta = await this.iaService.obtenerRespuesta(message);
            res.status(200).json({ message: respuesta });
        } catch (error) {
            console.error("[controller] Error al obtener una respuesta de la ia:", error);
            res.status(500).json({ message: 'Error al obtener una respuesta', error })
        }

    }
}