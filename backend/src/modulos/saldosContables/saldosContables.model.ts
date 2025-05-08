import { DataTypes, Model } from "sequelize";
import { sequelize } from '../../database/database.connection';
import { TABLA_SALDOCONTABLE } from "../../database/database.constants";

export class SaldoContable extends Model {
    public id!: number;
    public fecha!: Date;
    public nombreOficina!: string;
    public codigoOficina!: string;
    public codigoCuentaContable!: string;
    public nombreCuentaContable!: string;
    public esDeudora!: Boolean;
    public saldo!: number;
}

SaldoContable.init(
    {
        id: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        nombreOficina: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "nombre_oficina"
        },
        codigoCuentaContable: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "codigo_cuenta_contable"
        },
        nombreCuentaContable: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "nombre_cuenta_contable"
        },
        saldo: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        codigoOficina: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "codigo_oficina"
        },
        esDeudora: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: "es_deudora"
        }
    },
    {
        sequelize,
        modelName: 'Indicador',
        tableName: TABLA_SALDOCONTABLE,
        timestamps: true
    }
)