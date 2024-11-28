import { Injectable } from '@nestjs/common';
import { UserService } from '../../../../domain/services/user/user.service';
import { UserEntity } from '../../../../domain/entities/user/user.entity';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(): Promise<UserEntity[]> {
    const users = await this.userService.findAll();
    return users;
  }
}