import { Router } from 'express';
import { IndicadoresCalculadosController } from './indicadoresCalculados.controller';
const router = Router();
const indicadoresCalculadosController = new IndicadoresCalculadosController();

// Ruta para obtener todos los indicadores financieros
router.get('/', indicadoresCalculadosController.obtenerIndicadoresCalculados.bind(indicadoresCalculadosController));
router.get('/oficina', indicadoresCalculadosController.obtenerIndicadoresCalculadosPorOficina.bind(indicadoresCalculadosController));
export default router;