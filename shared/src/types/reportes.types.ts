export interface ConfiguracionReporteDTO {
    /** 
     * Nombre único de la configuración de reporte
     */
    nombre: string;

    /**
     * Descripción opcional de la configuración
     */
    descripcion: string | null;

    /**
     * Categorías asociadas a la configuración
     * @example [{ nombre: "category1", id: "1" }]
     */
    categorias: Array<{
        id: string;
        nombre: string;
        [key: string]: any; // Para propiedades adicionales
    }>;

    /**
     * Indica si la configuración está activa
     */
    esActivo: boolean;

    /**
     * Fecha de creación de la configuración
     */
    fechaCreacion: Date;

    /**
     * Fecha de última modificación de la configuración
     */
    fechaModificacion: Date;
}

export interface ConfiguracionesActivasResponse {
    /**
     * Lista de configuraciones activas de reportes
     */
    configuraciones: ConfiguracionReporteDTO[];
}