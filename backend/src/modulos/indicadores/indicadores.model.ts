import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../../database/database.connection';
import { TABLA_INDICADORES } from '../../database/database.constants';

/**
 * Modelo para representar un indicador financiero
 * Este modelo define la estructura de un indicador, incluyendo su fórmula asociada,
 * metas y configuración de interpretación.
 */
export class Indicador extends Model {
    public id!: number;
    public nombre!: string;
    public descripcion!: string;
    public idFormula!: number;
    public meta!: number;
    public mayorEsMejor!: boolean;
    public estaActivo!: boolean;
    public umbrales!: {
        umbrales: Array<{
            color: string;
            nivel: string;
            valorMax: number;
            valorMin: number;
            descripcion: string;
        }>;
        configuracion: {
            decimales: number;
            invertido: boolean;
            mostrarTendencia: boolean;
            formatoVisualizacion: string;
        };
        alerta: number;
        advertencia: number;
    };
    public estaEnPantallaInicial!: boolean;
    public ordenMuestra!: number;
    public createdAt!: Date;
    public updatedAt!: Date;

    /**
     * Valida que los datos del modelo sean correctos.
     * @returns {boolean} Verdadero si los datos son válidos.
     */
    public esValido(): boolean {
        if (!this.nombre || this.nombre.trim() === '') {
            return false;
        }
        if (!this.idFormula) {
            return false;
        }
        return true;
    }

    /**
     * Convierte el modelo a un objeto plano para almacenar en la base de datos.
     * @returns {Object} Objeto plano con los datos del modelo.
     */
    public toDbObject(): Record<string, any> {
        return {
            id: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            idFormula: this.idFormula,
            meta: this.meta,
            mayorEsMejor: this.mayorEsMejor,
            estaActivo: this.estaActivo,
            umbrales: JSON.stringify(this.umbrales),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            estaEnPantallaInicial: this.estaEnPantallaInicial,
            ordenMuestra: this.ordenMuestra,
        };
    }
}

Indicador.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idFormula: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_formula',
        },
        meta: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0,
        },
        mayorEsMejor: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: 'mayor_es_mejor',
        },
        estaActivo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: 'esta_activo',
        },
        umbrales: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {
                umbrales: [
                    {
                        color: '#28a745',
                        nivel: 'excelente',
                        valorMax: 0,
                        valorMin: 0,
                        descripcion: 'Rendimiento excelente',
                    },
                    {
                        color: '#20c997',
                        nivel: 'bueno',
                        valorMax: 0,
                        valorMin: 0,
                        descripcion: 'Rendimiento bueno',
                    },
                    {
                        color: '#ffc107',
                        nivel: 'aceptable',
                        valorMax: 0,
                        valorMin: 0,
                        descripcion: 'Rendimiento aceptable',
                    },
                    {
                        color: '#fd7e14',
                        nivel: 'deficiente',
                        valorMax: 0,
                        valorMin: 0,
                        descripcion: 'Rendimiento deficiente',
                    },
                    {
                        color: '#dc3545',
                        nivel: 'critico',
                        valorMax: 0,
                        valorMin: 0,
                        descripcion: 'Rendimiento crítico',
                    },
                ],
                configuracion: {
                    decimales: 2,
                    invertido: false,
                    mostrarTendencia: true,
                    formatoVisualizacion: 'porcentaje',
                },
                alerta: 0.0,
                advertencia: 0.0,
            },
        },
        estaEnPantallaInicial: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'esta_en_pantalla_principal',
        },
        ordenMuestra: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            field: 'orden_muestra',
        },
    },
    {
        sequelize,
        modelName: 'Indicador',
        tableName: TABLA_INDICADORES,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);