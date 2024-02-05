import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PartiesService {
  constructor(private prisma: PrismaService) {} 

  async getPartiesByDate(date: Date): Promise<{  date: Date;  }[]> {
    const parties = await this.prisma.party.findMany({ where: { date } });
    return parties.map((party) => ({
    
      date: party.date,
    
    }));
  }
}