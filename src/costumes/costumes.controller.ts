import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CostumesService } from './costumes.service';
import { CreateCostumeDto } from './dto/create-costume.dto';
import { UpdateCostumeDto } from './dto/update-costume.dto';

@Controller('costumes')
export class CostumesController {
  constructor(private readonly costumesService: CostumesService) {}

  @Get('stock')
  getCostumesInStock(): string[] {
    return this.costumesService.getCostumesInStock();
  }

  @Post('supplying')
  addCostumes(): string {
    return this.costumesService.addCostumes();
  }
}
