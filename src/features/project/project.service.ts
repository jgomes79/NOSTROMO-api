import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { Currency } from '@/features/currency/currency.entity';
import { Project } from '@/features/project/project.entity';
import { Tier } from '@/features/tier/tier.entity';
import { User } from '@/features/user/user.entity';

import { ProjectStates } from './project.types';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: EntityRepository<Project>,
  ) {}

  /**
   * Retrieves a Project by its ID.
   *
   * @param {number} id - The ID of the project to retrieve.
   * @returns {Promise<Project>} A promise that resolves to the project with the specified ID.
   */
  async getById(id: number): Promise<Project> {
    return await this.projectRepository.findOne({ id });
  }

  /**
   * Retrieves a Project by its slug.
   *
   * @param {string} slug - The slug of the project to retrieve.
   * @returns {Promise<Project>} A promise that resolves to the project with the specified slug.
   */
  async getBySlug(slug: string): Promise<Project> {
    return await this.projectRepository.findOne({ slug }, ['currency', 'owner', 'tier']);
  }

  async getAllProjects(state: number, page: number, limit: number): Promise<{ rows: Project[]; count: number }> {
    const [rows, count] = await this.projectRepository.findAndCount(
      { state },
      {
        limit,
        offset: page * limit,
        orderBy: { id: 'DESC' },
        populate: ['currency', 'owner', 'tier'],
      }
    );
    return { rows, count };
  }

  async getAllVIPProjects(): Promise<Project[]> {
    return await this.projectRepository.find(
      {
        vip: true,
        state: { $in: [ProjectStates.UPCOMING, ProjectStates.FUNDING_PHASE_1, ProjectStates.FUNDING_PHASE_2, ProjectStates.FUNDING_PHASE_3] },
      },
      ['currency', 'owner', 'tier']
    );
  }
}
