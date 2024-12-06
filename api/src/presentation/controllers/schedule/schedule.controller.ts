import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateScheduleUseCase } from 'src/application/use-cases/create-use-cases/create-schedule.use-case/create-schedule.use-case';
import { DeleteScheduleUseCase } from 'src/application/use-cases/delete-use-cases/delete-schedule.use-case/delete-schedule.use-case';
import { FindAllSchedulesUseCase } from 'src/application/use-cases/find-use-cases/find-schedule.use-case/find-all-schedules.use-case';
import { FindScheduleByIdUseCase } from 'src/application/use-cases/find-use-cases/find-schedule.use-case/find-schedule-by-id.use-case';
import { UpdateScheduleUseCase } from 'src/application/use-cases/update-use-cases/update-schedule.use-case/update-schedule.use-case';
import { Schedule } from 'src/domain/entities/schedule/schedule';


@Controller('schedules')
export class ScheduleController {
  constructor(
    private readonly createScheduleUseCase: CreateScheduleUseCase,
    private readonly findAllSchedulesUseCase: FindAllSchedulesUseCase,
    private readonly findScheduleByIdUseCase: FindScheduleByIdUseCase,
    private readonly updateScheduleUseCase: UpdateScheduleUseCase,
    private readonly deleteScheduleUseCase: DeleteScheduleUseCase
  ) {}

  @Post()
  async create(@Body() schedule: Schedule): Promise<Schedule> {
    return this.createScheduleUseCase.execute(schedule);
  }

  @Get()
  async findAll(): Promise<Schedule[]> {
    return this.findAllSchedulesUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Schedule> {
    return this.findScheduleByIdUseCase.execute(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateData: { newDate: Date, newStartTime: string, newEndTime: string }): Promise<void> {
    const { newDate, newStartTime, newEndTime } = updateData;
    return this.updateScheduleUseCase.execute(id, newDate, newStartTime, newEndTime);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.deleteScheduleUseCase.execute(id);
  }
}