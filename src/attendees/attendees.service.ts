import { Injectable } from '@nestjs/common';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AttendeesService {
  constructor(private prisma: PrismaService) {} 

  private costumesInStock: string[] = ['WereWolf Costume', 'Vampire Costume', 'Ghost Costume']; // Supongamos que estos son los disfraces disponibles
  
  async getAdultAttendees(): Promise<{ dni: string;  age: number }[]> {
    return this.prisma.attendee.findMany({
      where: {
        age: 18
      },
    });
    
  }
  async getNervousAttendees(): Promise<{isNervous: boolean}[]> {
    return this.prisma.attendee.findMany({
      where: {
        isNervous: true, 
      },
    });
  }
  async purchaseCostumes(): Promise<{ attendee: string; costume: string }[]> {
    const attendees = await this.prisma.attendee.findMany(); 

    const purchases: { attendee: string; costume: string }[] = [];

    for (const attendee of attendees) {
      const selectedCostume = this.costumesInStock.pop(); 
      if (selectedCostume) {
        if (attendee.money >= 100) { 
          purchases.push({ attendee: `${attendee.firstName} ${attendee.lastName}`, costume: selectedCostume });
          attendee.money -= 100; 

      
          await this.prisma.attendee.update({
            where: { dni: attendee.dni },
            data: { money: attendee.money },
          });
        }
      }
    }

    return purchases;
  }

  async increaseBudget(dni: string): Promise<string> {
    const attendee = await this.prisma.attendee.findUnique({ where: { dni } });
    if (attendee) {
      attendee.money += 50; 
      await this.prisma.attendee.update({
        where: { dni },
        data: { money: attendee.money },
      });
      return `Budget increased successfully for ${attendee.firstName} ${attendee.lastName}.`;
    }
    return 'Attendee not found.';
  }

  async reallocateBudget(donorDni: string, recipientDni: string): Promise<string> {
    const donor = await this.prisma.attendee.findUnique({ where: { dni: donorDni } });
    const recipient = await this.prisma.attendee.findUnique({ where: { dni: recipientDni } });

    if (donor && recipient && donor.money > 0 && recipient.age < 18) {
      const amountToTransfer = Math.min(donor.money, recipient.money); 
      donor.money -= amountToTransfer;
      recipient.money += amountToTransfer;

      await this.prisma.attendee.update({
        where: { dni: donorDni },
        data: { money: donor.money },
      });

      await this.prisma.attendee.update({
        where: { dni: recipientDni },
        data: { money: recipient.money },
      });

      return `Budget reallocation successful from ${donor.firstName} ${donor.lastName} to ${recipient.firstName} ${recipient.lastName}.`;
    }
    return 'Unable to reallocate budget.';
  }
}