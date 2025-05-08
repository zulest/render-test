import { BaseFirebaseRepository } from '../../base/base.firebaseRepository';
import { SaldosContables } from './saldos.model';

export class SaldosRepository extends BaseFirebaseRepository<SaldosContables> {
  constructor() {
    super('SaldosContables2');
  }

  async obtenerSaldosPorOficinaYFecha(
    codigoOficina: string,
    fechas: Date[]
  ): Promise<SaldosContables[]> {
    try {
      const fechaConFormato = (fecha: Date) => {
        const dia = fecha.getDate().toString();
        const mes = (fecha.getMonth() + 1).toString();
        const ano = fecha.getFullYear();
        return `${dia}/${mes}/${ano}`;
      };

      const querySnapshot = await this.collection
        .where('codigoOficina', '==', codigoOficina)
        .where('fecha', 'in', fechas.map(f => fechaConFormato(f)))
        .get();

      const saldos: SaldosContables[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as SaldosContables;
        saldos.push(data);
      });

      return saldos;
    } catch (error) {
      console.error('Error al obtener saldos:', error);
      throw error;
    }
  }
}
