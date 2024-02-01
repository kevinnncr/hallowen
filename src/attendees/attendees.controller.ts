import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';

@Controller('attendees')
export class AttendeesController {
  constructor(private readonly attendeesService: AttendeesService) {}

  @Get('purchase')
  async purchaseCostumes(): Promise<{ attendee: string; costume: string }[]> {
    return this.attendeesService.purchaseCostumes();
  }
  @Get('adults')
  async getAdultAttendees(): Promise<{ dni: string; firstName: string; lastName: string; age: number }[]> {
    return this.attendeesService.getAdultAttendees();
  }
  @Get('nervous')
  async getNervousAttendees(): Promise<any> {
    return this.attendeesService.getNervousAttendees();
  }

  @Post('bank/:dni')
  async increaseBudget(@Param('dni') dni: string): Promise<string> {
    return this.attendeesService.increaseBudget(dni);
  }

  @Post('reallocation/:donorDni/:recipientDni')
  async reallocateBudget(
    @Param('donorDni') donorDni: string,
    @Param('recipientDni') recipientDni: string,
  ): Promise<string> {
    return this.attendeesService.reallocateBudget(donorDni, recipientDni);
  }
}
