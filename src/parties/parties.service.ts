import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PartiesService {
  constructor(private prisma: PrismaService) {} 

  async getPartiesByDate(date: Date): Promise<{ name: string; date: Date; address: string }[]> {
    const parties = await this.prisma.party.findMany({ where: { date } });
    return parties.map((party) => ({
      name: party.name,
      date: party.date,
      address: party.address,
    }));
  }
}