import { Router } from 'express';
import { ReportesController } from './reportes.controller';

const router = Router();
const reportesController = new ReportesController();

// Ruta para obtener configuraciones activas
router.get('/activos', reportesController.obtenerConfiguracionesActivas.bind(reportesController));


export default router;