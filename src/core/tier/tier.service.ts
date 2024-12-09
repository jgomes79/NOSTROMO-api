import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { Tier } from './tier.entity';

@Injectable()
export class TierService {
  constructor(private readonly em: EntityManager) {}

  /**
   * Retrieves a Tier by its ID.
   *
   * @param {number} id - The ID of the tier to retrieve.
   * @returns {Promise<Tier>} A promise that resolves the tier with the specified ID.
   */
  async getById(id: number): Promise<Tier> {
    return await this.em.findOne(Tier, { id });
  }

  /**
   * Retrieves all tiers.
   *
   * @returns {Promise<Tier[]>} A promise that resolves all the tiers.
   */
  async getAllTiers(): Promise<Tier[]> {
    return await this.em.find(Tier, {});
  }
}
