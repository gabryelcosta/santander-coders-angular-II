export class RoleEntity {
  private _id: number;
  private _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    if (!newName || newName.trim().length === 0) {
      throw new Error('O nome da role não pode ser vazio.');
    }
    this._name = newName;
  }

  isAdmin(): boolean {
    return this._name.toLowerCase() === 'administrador';
  }

  isDoctor(): boolean {
    return this._name.toLowerCase() === 'medico';
  }

  isPatient(): boolean {
    return this._name.toLowerCase() === 'paciente';
  }

  updateName(newName: string): void {
    this.name = newName;
  }
}