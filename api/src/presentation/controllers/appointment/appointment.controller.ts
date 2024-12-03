import { Controller, Post, Get, Put, Delete, Param, Body, BadRequestException, NotFoundException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { CreateAppointmentUseCase } from '../../../application/use-cases/create-use-cases/create-appointment.use-case/create-appointment.use-case';
import { FindAppointmentByIdUseCase } from '../../../application/use-cases/find-use-cases/find-appointment.use-case/find-appointment-by-id.use-case';
import { FindAllAppointmentsUseCase } from '../../../application/use-cases/find-use-cases/find-appointment.use-case/find-all-appointment-use-case';
import { RescheduleAppointmentUseCase } from '../../../application/use-cases/update-use-cases/update-appointment.use-case/update-appointment.use-case';
import { DeleteAppointmentUseCase } from '../../../application/use-cases/delete-use-cases/delete-appointment.use-case/delete-appointment.use-case';
import { AppointmentEntity } from '../../../domain/entities/appointment/appointment';
import { JwtAuthGuard } from '../../../application/auth/jwt-auth.guard';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly findAppointmentByIdUseCase: FindAppointmentByIdUseCase,
    private readonly findAllAppointmentsUseCase: FindAllAppointmentsUseCase,
    private readonly rescheduleAppointmentUseCase: RescheduleAppointmentUseCase,
    private readonly deleteAppointmentUseCase: DeleteAppointmentUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createAppointment(
    @Body() body: { id: number, patientCodUser: string, doctorCodUser: string, appointmentTime: string }
  ): Promise<AppointmentEntity> {
    const appointmentTime = new Date(body.appointmentTime);
    if (appointmentTime <= new Date()) {
      throw new BadRequestException('A data e hora da consulta devem ser no futuro.');
    }

    return this.createAppointmentUseCase.execute(body.id, body.patientCodUser, body.doctorCodUser, appointmentTime);
  }
/*
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<AppointmentEntity> {
    const appointment = await this.findAppointmentByIdUseCase.execute(id);
    if (!appointment) {
      throw new NotFoundException('Consulta não encontrada.');
    }
    return appointment;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<AppointmentEntity[]> {
    try {
      return await this.findAllAppointmentsUseCase.execute();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar todas as consultas');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async rescheduleAppointment(
    @Param('id') id: number,
    @Body() body: { newAppointmentTime: string }
  ): Promise<void> {
    const newAppointmentTime = new Date(body.newAppointmentTime);
    if (newAppointmentTime <= new Date()) {
      throw new BadRequestException('A nova data e hora da consulta devem ser no futuro.');
    }

    await this.rescheduleAppointmentUseCase.execute(id, newAppointmentTime);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAppointment(@Param('id') id: number): Promise<void> {
    await this.deleteAppointmentUseCase.execute(id);
  }
*/}