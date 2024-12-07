import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AppointmentEntity } from '../../../domain/entities/appointment/appointment';
import { CreateAppointmentUseCase } from 'src/application/use-cases/create-use-cases/create-appointment.use-case/create-appointment.use-case';
import { FindAllAppointmentsUseCase } from 'src/application/use-cases/find-use-cases/find-appointment.use-case/find-all-appointment-use-case';
import { FindAppointmentByIdUseCase } from 'src/application/use-cases/find-use-cases/find-appointment.use-case/find-appointment-by-id.use-case';
import { UpdateAppointmentUseCase } from 'src/application/use-cases/update-use-cases/update-appointment.use-case/update-appointment.use-case';
import { DeleteAppointmentUseCase } from 'src/application/use-cases/delete-use-cases/delete-appointment.use-case/delete-appointment.use-case';
import { LocalAuthGuard } from 'src/application/auth/local-auth.guard';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly findAllAppointmentsUseCase: FindAllAppointmentsUseCase,
    private readonly findAppointmentByIdUseCase: FindAppointmentByIdUseCase,
    private readonly updateAppointmentUseCase: UpdateAppointmentUseCase,
    private readonly deleteAppointmentUseCase: DeleteAppointmentUseCase
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async create(@Body() appointment: AppointmentEntity): Promise<AppointmentEntity> {
    return this.createAppointmentUseCase.execute(appointment);
  }

  @UseGuards(LocalAuthGuard)
  @Get()
  async findAll(): Promise<AppointmentEntity[]> {
    return this.findAllAppointmentsUseCase.execute();
  }

  @UseGuards(LocalAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<AppointmentEntity> {
    return this.findAppointmentByIdUseCase.execute(id);
  }

  @UseGuards(LocalAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() newAppointmentTime: Date): Promise<void> {
    return this.updateAppointmentUseCase.execute(id, newAppointmentTime);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.deleteAppointmentUseCase.execute(id);
  }
}