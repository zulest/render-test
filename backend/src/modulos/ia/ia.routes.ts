import { Router } from 'express';
import { IaController } from './ia.controller';

const router = Router();
const iaController = new IaController();

// Ruta para enviar un mensaje al chat de IA
router.post('/', iaController.obtenerRespuesta.bind(iaController));

export default router;