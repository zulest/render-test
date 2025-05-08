import { Router } from 'express';
import { IndicadoresController } from './indicadores.controller';

const router = Router();
const indicadoresController = new IndicadoresController();

// Ruta para obtener todos los indicadores financieros
router.get('/', indicadoresController.obtenerIndicadores.bind(indicadoresController));

// Ruta para obtener indicadores calculados
router.get('/calcular/:oficina', indicadoresController.obtenerIndicadoresCalculados.bind(indicadoresController));

router.get('/calcular-periodo', indicadoresController.obtenerPromedioIndicadoresOficina.bind(indicadoresController));

// Ruta para obtener un indicador financiero por ID
router.get('/:id', indicadoresController.obtenerIndicadorPorId.bind(indicadoresController));

// Ruta para crear un nuevo indicador financiero
router.post('/', indicadoresController.crearIndicador.bind(indicadoresController));

// Ruta para actualizar un indicador financiero existente
router.put('/:id', indicadoresController.actualizarIndicador.bind(indicadoresController));

// Ruta para eliminar un indicador financiero
router.delete('/:id', indicadoresController.eliminarIndicador.bind(indicadoresController));

export default router;