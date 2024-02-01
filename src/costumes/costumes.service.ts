import { Injectable } from '@nestjs/common';
import { CreateCostumeDto } from './dto/create-costume.dto';
import { UpdateCostumeDto } from './dto/update-costume.dto';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CostumesService {
  constructor(private prisma: PrismaService) {}
  create(createCostumeDto: CreateCostumeDto) {
    return 'This action adds a new costume';
  }

  findAll() {
    return `This action returns all costumes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} costume`;
  }

  update(id: number, updateCostumeDto: UpdateCostumeDto) {
    return `This action updates a #${id} costume`;
  }

  remove(id: number) {
    return `This action removes a #${id} costume`;
  }
}
