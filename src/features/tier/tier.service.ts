import { Inject, Injectable } from '@nestjs/common';

import { Tier } from '@/features/tier/tier.entity';

@Injectable()
export class TierService {
  constructor(
    @Inject('TierRepository')
    private tierRepository: typeof Tier,
  ) {}

  /**
   * Retrieves a ProjectVote by its ID.
   *
   * @param {number} id - The ID of the tier to retrieve.
   * @returns {Promise<ProjectVote>} A promise that resolves the tier with the specified ID.
   */
  async getById(id: number): Promise<Tier> {
    return await this.tierRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Retrieves a All tiers for a project.
   *
   * @returns {Promise<Tier[]>} A promise that resolves all the tiers.
   */
  async getAllTiers(): Promise<Tier[]> {
    return await this.tierRepository.findAll({
      include: [Tier],
    });
  }
}
