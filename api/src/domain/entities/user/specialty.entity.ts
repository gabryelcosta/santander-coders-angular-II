export class SpecialtyEntity {
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
      throw new Error('O nome da especialidade não pode ser vazio.');
    }
    this._name = newName;
  }

  updateName(newName: string): void {
    this.name = newName;
  }
}