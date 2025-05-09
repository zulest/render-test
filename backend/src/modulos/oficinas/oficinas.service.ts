import { Oficina } from './oficinas.model';
import { OficinasRepository } from './oficinas.repository';

export class OficinaService {
    private oficinasRepository: OficinasRepository;

    constructor() {
        this.oficinasRepository = new OficinasRepository();
    }

    async obtenerTodas(): Promise<Oficina[]> {
        return await this.oficinasRepository.obtenerTodas();
    }
}
