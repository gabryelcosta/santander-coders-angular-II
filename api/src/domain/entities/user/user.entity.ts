export class UserEntity {
  private _id: number;
  private _codUser: string;
  private _login: string;
  private _username: string;
  private _password: string;

  constructor(id: number, codUser: string, login: string, username: string, password: string) {
    if (!login || login.trim().length === 0) {
      throw new Error('O login não pode ser vazio.');
    }
    if (!username || username.trim().length === 0) {
      throw new Error('O nome de usuário não pode ser vazio.');
    }
    if (password.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres.');
    }

    this._id = id;
    this._codUser = codUser;
    this._login = login;
    this._username = username;
    this._password = password;
  }

  get id(): number {
    return this._id;
  }

  get codUser(): string {
    return this._codUser;
  }

  get login(): string {
    return this._login;
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  set username(newUsername: string) {
    if (!newUsername || newUsername.trim().length === 0) {
      throw new Error('O nome de usuário não pode ser vazio.');
    }
    this._username = newUsername;
  }

  set password(newPassword: string) {
    if (newPassword.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres.');
    }
    this._password = newPassword;
  }

  changePassword(newPassword: string): void {
    this.password = newPassword;
  }

  updateUsername(newUsername: string): void {
    this.username = newUsername;
  }
}