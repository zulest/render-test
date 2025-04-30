import express, { Request, Response } from 'express';
import path from 'path';
import indicadoresRoutes from './modulos/indicadores/indicadores.routes';
import indicadoresCalculadosRoutes from './modulos/indicadoresCalculados/indicadoresCalculados.routes';
import iaRoutes from './modulos/ia/ia.routes';
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas de indicadores
app.use('/api/indicadores', indicadoresRoutes);
app.use('/api/indicadores-calculados', indicadoresCalculadosRoutes)
app.use('/api/chat', iaRoutes);

// Servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Ruta principal para el frontend
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});