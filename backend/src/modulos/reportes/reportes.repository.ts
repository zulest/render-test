import { BaseRepository } from "../../base/base.repository";
import { ConfiguracionReporte } from "./reportes.model";

export class ReportesRepository extends BaseRepository<ConfiguracionReporte> {
    constructor() {
        super(ConfiguracionReporte);
    }

    obtenerConfiguracionesActivas = async () => {
        return this.model.findAll({ where: { esActivo: true } });
    }
}