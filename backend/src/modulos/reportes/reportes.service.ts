import { ConfiguracionReporte } from "./reportes.model";
import { ReportesRepository } from "./reportes.repository";
import {
  ConfiguracionesActivasResponse,
  ConfiguracionGuardadaResponse,
  ConfiguracionReporteDTO,
  CuentaResponse,
  ReporteTendenciaRequest,
  ReporteTendenciaResponse,
} from "shared/src/types/reportes.types";
import { ApiResponse } from "shared/src/types/generic.types";
export class ReportesService {
  private reportesRepository: ReportesRepository;

  constructor() {
    this.reportesRepository = new ReportesRepository();
  }

  async obtenerConfiguracionesActivas(): Promise<ConfiguracionesActivasResponse> {
    const configuraciones =
      await this.reportesRepository.obtenerConfiguracionesActivas();
    return {
      configuraciones: configuraciones,
    };
  }

  async obtenerCuentas(): Promise<CuentaResponse> {
    return {
      cuentas: await this.reportesRepository.obtenerCuentas(),
    };
  }

  async generarReporteTendencia(
    reporteData: ReporteTendenciaRequest
  ): Promise<ReporteTendenciaResponse> {
    const response = await this.reportesRepository.generarReporteTendencia(
      reporteData
    );
    return response;
  }

  async guardarConfiguracion(
    configuracion: ConfiguracionReporteDTO
  ): Promise<ConfiguracionGuardadaResponse> {
    //convertir al modelo para guardar en la bd mapeando sus propiedades
    const configuracionModel = new ConfiguracionReporte();
    configuracionModel.nombre = configuracion.nombre;
    configuracionModel.descripcion = configuracion.descripcion;
    configuracionModel.categorias = configuracion.categorias;
    configuracionModel.esActivo = configuracion.esActivo;
    configuracionModel.fechaCreacion = new Date();
    configuracionModel.fechaModificacion = new Date();
    await this.reportesRepository.crear(configuracionModel.toDbObject());
    return {
      success: true,
      message: "Configuración guardada correctamente",
    };
  }

  async actualizarConfiguracion(
    configuracion: ConfiguracionReporteDTO
  ): Promise<ConfiguracionGuardadaResponse> {
    const response = await this.reportesRepository.actualizarConfiguracion(
      configuracion
    );
    return response;
  }

  async eliminarConfiguracion(
    configuracion: ConfiguracionReporteDTO
  ): Promise<ApiResponse> {
    console.log("[ReportesService] eliminando configuracion... ", configuracion);
    await this.reportesRepository.eliminarConfiguracion(configuracion);
    return {
      success: true,
      message: "Configuracion de reporte eliminada correctamente",
    };
  }
}
