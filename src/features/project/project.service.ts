import { Inject, Injectable } from '@nestjs/common';

import { Currency } from '@/features/currency/currency.entity';
import { Project } from '@/features/project/project.entity';
import { Tier } from '@/features/tier/tier.entity';
import { User } from '@/features/user/user.entity';

import { ProjectStates } from './project.types';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('ProjectRepository')
    private projectRepository: typeof Project,
  ) {}

  /**
   * Retrieves a Project by its ID.
   *
   * @param {number} id - The ID of the project to retrieve.
   * @returns {Promise<Project>} A promise that resolves to the project with the specified ID.
   */
  async getById(id: number): Promise<Project> {
    return await this.projectRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Retrieves a Project by its slug.
   *
   * @param {string} slug - The slug of the project to retrieve.
   * @returns {Promise<Project>} A promise that resolves to the project with the specified slug.
   */
  async getBySlug(slug: string): Promise<Project> {
    return await this.projectRepository.findOne({
      where: {
        slug,
      },
      include: [Currency, User, Tier],
    });
  }

  async getAllProjects(state: number, page: number, limit: number): Promise<{ rows: Project[]; count: number }> {
    return await this.projectRepository.findAndCountAll({
      where: {
        state,
      },
      limit,
      offset: page * limit,
      order: [['id', 'DESC']],
      include: [Currency, User, Tier],
    });
  }

  async getAllVIPProjects(): Promise<Project[]> {
    return await this.projectRepository.findAll({
      where: {
        vip: true,
        state: [ProjectStates.UPCOMING, ProjectStates.FUNDING_PHASE_1, ProjectStates.FUNDING_PHASE_2, ProjectStates.FUNDING_PHASE_3],
      },
      include: [Currency, User, Tier],
    });
  }
}
