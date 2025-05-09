import { ReportesRepository } from "./reportes.repository";
import { ConfiguracionesActivasResponse } from "shared/src/types/reportes.types";

export class ReportesService {
  private reportesRepository: ReportesRepository;

  constructor() {
    this.reportesRepository = new ReportesRepository();
  }

  async obtenerConfiguracionesActivas(): Promise<ConfiguracionesActivasResponse> {
    const configuraciones = await this.reportesRepository.obtenerConfiguracionesActivas();
    return {
      configuraciones: configuraciones
    };
  }
}
