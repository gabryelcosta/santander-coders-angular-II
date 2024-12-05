import { UserEntity } from './user.entity';
import { SpecialtyEntity } from './specialty.entity';

export class DoctorEntity extends UserEntity {
  private _especialidade: SpecialtyEntity;

  constructor(id: number, codUser: string, login: string, username: string, password: string, especialidade: SpecialtyEntity) {
    super(id, codUser, login, username, password);
    this._especialidade = especialidade;
  }

  get especialidade(): SpecialtyEntity {
    return this._especialidade;
  }

  set especialidade(newEspecialidade: SpecialtyEntity) {
    if (!newEspecialidade || newEspecialidade.name.trim().length === 0) {
      throw new Error('A especialidade não pode ser vazia.');
    }
    this._especialidade = newEspecialidade;
  }

  updateEspecialidade(newEspecialidade: SpecialtyEntity): void {
    this.especialidade = newEspecialidade;
  }
}