export class UserRoleEntity {
  userId: number;
  roleId: number;

  constructor(userId: number, roleId: number) {
    this.userId = userId;
    this.roleId = roleId;
  }

  hasRole(roleId: number): boolean {
    return this.roleId === roleId;
  }

  updateRole(newRoleId: number): void {
    if (newRoleId <= 0) {
      throw new Error('O ID do papel deve ser um número positivo.');
    }
    this.roleId = newRoleId;
  }
}