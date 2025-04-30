import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../../database/database.connection';
import { TABLA_INDICADORES_CALCULADOS } from '../../database/database.constants';


export class IndicadorCalculado extends Model {
    public id!: number;
    public fecha!: Date;
    public idIndicador!: number;
    public codigoOficina!: string;
    public valor!: number;
    public componentes!: string;

    /**
     * Convierte el modelo a un objeto plano para almacenar en la base de datos.
     * @returns {Object} Objeto plano con los datos del modelo. 
     */
    public toDbObject(): Record<string, any> {
        return {
            id: this.id,
            fecha: this.fecha,
            idInicador: this.idIndicador,
            codigoOficina: this.codigoOficina,
            valor: this.valor,
            componentes: this.componentes
        }
    }
}

IndicadorCalculado.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    idIndicador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'ID del indicador asociado'
    },
    codigoOficina: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Código de la oficina'
    },
    valor: {
        type: DataTypes.DECIMAL(15, 6),
        allowNull: true
    },
    componentes: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    sequelize, // Instancia de Sequelize
    modelName: 'IndicadorCalculado', // Nombre del modelo
    tableName: TABLA_INDICADORES_CALCULADOS, // Nombre de la tabla en la base de datos
    indexes: [],
    timestamps: true, // Habilitar timestamps (createdAt y updatedAt)

});