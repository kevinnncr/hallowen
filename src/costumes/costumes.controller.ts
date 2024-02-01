import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CostumesService } from './costumes.service';
import { CreateCostumeDto } from './dto/create-costume.dto';
import { UpdateCostumeDto } from './dto/update-costume.dto';

@Controller('costumes')
export class CostumesController {
  constructor(private readonly costumesService: CostumesService) {}

  @Post()
  create(@Body() createCostumeDto: CreateCostumeDto) {
    return this.costumesService.create(createCostumeDto);
  }

  @Get()
  findAll() {
    return this.costumesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.costumesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCostumeDto: UpdateCostumeDto) {
    return this.costumesService.update(+id, updateCostumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costumesService.remove(+id);
  }
}
