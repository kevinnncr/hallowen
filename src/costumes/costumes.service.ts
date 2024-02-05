import { Injectable } from '@nestjs/common';
import { CreateCostumeDto } from './dto/create-costume.dto';
import { UpdateCostumeDto } from './dto/update-costume.dto';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CostumesService {
  private costumesInStock: string[] = ['WereWolf Costume', 'Vampire Costume', 'Ghost Costume'];

  private attendees: number = 3; 

  getCostumesInStock(): string[] {
    return this.costumesInStock;
  }

  addCostumes(): string {
    const costumesNeeded = this.attendees - this.costumesInStock.length;
    if (costumesNeeded > 0) {
      
      for (let i = 0; i < costumesNeeded; i++) {
        this.costumesInStock.push(`Costume ${i + 1}`);
      }
      return `Se agregaron ${costumesNeeded} disfraces al inventario.`;
    }
    return 'No se necesitan más disfraces en stock.';
  }
}