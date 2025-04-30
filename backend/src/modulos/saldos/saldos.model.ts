/**
 * Modelo para representar un saldo contable
 */
export class SaldoContable {
    fecha: Date; // Propiedad para almacenar la fecha
    nombreOficina: string; // Propiedad para almacenar el nombre de la oficina
    codigoCuentaContable: string; // Propiedad para almacenar el código de la cuenta contable
    nombreCuentaContable: string; // Propiedad para almacenar el nombre de la cuenta contable
    saldo: number; // Propiedad para almacenar el saldo     
    codigoOficina: string; // Propiedad para almacenar el código de la oficina

    constructor(
        fecha: string | Date,
        nombreOficina: string,
        codigoCuentaContable: string,
        nombreCuentaContable: string,
        saldo: number,
        codigoOficina: string) {
        // Asegurarse de que la fecha sea correcta y se mantenga la fecha original
        try {
            if (fecha instanceof Date) {
                // Crear una nueva fecha preservando el día exacto
                const fechaStr = fecha.toISOString().split('T')[0]; // YYYY-MM-DD
                this.fecha = new Date(fechaStr + 'T12:00:00Z'); // Usar mediodía UTC para evitar problemas de zona horaria
            } else if (typeof fecha === 'string') {
                // Verificar si la fecha ya está en formato YYYY-MM-DD
                if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
                    this.fecha = new Date(fecha + 'T12:00:00Z');
                } else {
                    // Intentar convertir usando Date
                    const fechaTemp = new Date(fecha);

                    // Verificar si la fecha es válida
                    if (isNaN(fechaTemp.getTime())) {
                        console.error('Fecha inválida recibida:', fecha);
                        // Usar fecha actual como fallback
                        const hoy = new Date();
                        const fechaHoyStr = hoy.toISOString().split('T')[0];
                        this.fecha = new Date(fechaHoyStr + 'T12:00:00Z');
                    } else {
                        const fechaStr = fechaTemp.toISOString().split('T')[0]; // YYYY-MM-DD
                        this.fecha = new Date(fechaStr + 'T12:00:00Z');
                    }
                }
            } else {
                // Si no es ni Date ni string, usar fecha actual
                console.error('Tipo de fecha no soportado:', typeof fecha);
                const hoy = new Date();
                const fechaHoyStr = hoy.toISOString().split('T')[0];
                this.fecha = new Date(fechaHoyStr + 'T12:00:00Z');
            }
        } catch (error) {
            console.error('Error al procesar la fecha:', error, 'Valor recibido:', fecha);
            // Usar fecha actual como fallback
            const hoy = new Date();
            const fechaHoyStr = hoy.toISOString().split('T')[0];
            this.fecha = new Date(fechaHoyStr + 'T12:00:00Z');
        }

        this.nombreOficina = nombreOficina;
        this.codigoOficina = codigoOficina || nombreOficina; // Si no se proporciona cu00f3digo, usar el nombre como fallback
        this.codigoCuentaContable = codigoCuentaContable;
        this.nombreCuentaContable = nombreCuentaContable;
        this.saldo = saldo;
    }

    /**
     * Devuelve la fecha en formato YYYY-MM-DD
     * @returns {string} Fecha formateada
     */
    getFechaFormateada() {
        // Extraer año, mes y día directamente de la fecha
        const anio = this.fecha.getUTCFullYear();
        const mes = String(this.fecha.getUTCMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
        const dia = String(this.fecha.getUTCDate()).padStart(2, '0');

        return `${anio}-${mes}-${dia}`;
    }
}