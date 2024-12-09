import { Get, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TierService } from './tier.service';

/**
 * Controller for handling project-related HTTP requests.
 */
@ApiTags('Tiers Service')
@Controller('tiers-service')
export class TierController {
  constructor(private readonly tierService: TierService) {}

  /**
   * Retrieves a tier by its ID.
   * 
   * @param id - The ID of the tier to retrieve.
   * @returns The tier with the specified ID.
   */
  @Get('/tiers/:id')
  async getTier(@Param('id') id: number) {
    return await this.tierService.getById(id);
  }

  /**
   * Retrieves all tiers.
   * 
   * @returns A list of all tiers.
   */
  @Get('/tiers')
  async getAllTiers() {
    return await this.tierService.getAllTiers();
  }
}
