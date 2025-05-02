import express, { Request, Response } from 'express';
import path from 'path';
import indicadoresRoutes from './modulos/indicadores/indicadores.routes';
import indicadoresCalculadosRoutes from './modulos/indicadoresCalculados/indicadoresCalculados.routes';
import iaRoutes from './modulos/ia/ia.routes';
import { ValidationError } from 'sequelize';
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas de indicadores
app.use('/api/indicadores', indicadoresRoutes);
app.use('/api/indicadores-calculados', indicadoresCalculadosRoutes)
app.use('/api/chat', iaRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (err instanceof ValidationError) {
        console.error('Error de validación de OpenAPI:', err.message);
        res.status(400).json({ message: 'Error de validación en la petición', errors: err.errors });
    } else {
        next(err); // Pasar el error al siguiente middleware si no es un error de validación de OpenAPI
    }
});

// Servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Ruta principal para el frontend
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});