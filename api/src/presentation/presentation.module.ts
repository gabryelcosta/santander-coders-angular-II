import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { ApplicationModule } from 'src/application/application.module';
import { AppointmentController } from './controllers/appointment/appointment.controller';
import { RoleController } from './controllers/user/role.controller';
import { AdminController } from './controllers/admin/admin.controller';
import { SpecialtyController } from './controllers/user/specialty.controller';


@Module({
  imports: [ApplicationModule],
  controllers: [UserController, RoleController, SpecialtyController, AdminController, AppointmentController],
})
export class PresentationModule {}