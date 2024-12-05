import { Inject, Injectable } from '@nestjs/common';

import { ProjectInvestment } from './projectInvestment.entity';

@Injectable()
export class ProjectInvestmentService {
  constructor(
    @Inject('ProjectInvestmentRepository')
    private projectInvestmentRepository: typeof ProjectInvestment,
  ) {}

  /**
   * Retrieves a Project by its ID.
   *
   * @param {number} id - The ID of the project to retrieve.
   * @returns {Promise<Project>} A promise that resolves to the project with the specified ID.
   */
  async getById(id: number): Promise<ProjectInvestment> {
    return this.projectInvestmentRepository.findOne({
      where: {
        id,
      },
    });
  }
}
