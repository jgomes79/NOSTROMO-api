import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { ProjectInvestment } from './project-investment.entity';

@Injectable()
export class ProjectInvestmentService {
  constructor(private readonly em: EntityManager) {}

  /**
   * Fetches a ProjectInvestment entity by its unique identifier.
   *
   * @param {number} id - The unique identifier of the project investment to be fetched.
   * @returns {Promise<ProjectInvestment>} A promise that resolves to the ProjectInvestment entity with the specified ID, or null if not found.
   */
  async getById(id: number): Promise<ProjectInvestment> {
    return await this.em.findOne(ProjectInvestment, { id });
  }
}
