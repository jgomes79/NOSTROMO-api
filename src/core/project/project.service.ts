import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { Project } from './project.entity';
import { ProjectStates } from './project.types';

@Injectable()
export class ProjectService {
  constructor(private readonly em: EntityManager) {}

  /**
   * Retrieves a Project by its ID.
   *
   * @param {number} id - The ID of the project to retrieve.
   * @returns {Promise<Project>} A promise that resolves to the project with the specified ID.
   */
  async getById(id: number): Promise<Project> {
    return await this.em.findOne(Project, { id });
  }

  /**
   * Retrieves a Project by its slug.
   *
   * @param {string} slug - The slug of the project to retrieve.
   * @returns {Promise<Project>} A promise that resolves to the project with the specified slug.
   */
  async getBySlug(slug: string): Promise<Project> {
    return await this.em.findOne(Project, { slug }, { populate: ['currency', 'owner'] });
  }

  /**
   * Retrieves all projects with a specified state, paginated.
   *
   * @param {number} state - The state of the projects to retrieve.
   * @param {number} page - The page number for pagination.
   * @param {number} limit - The number of projects per page.
   * @returns {Promise<{ rows: Project[]; count: number }>} A promise that resolves to an object containing the projects and the total count.
   */
  async getAllProjects(state: number, page: number, limit: number): Promise<{ rows: Project[]; count: number }> {
    const [rows, count] = await this.em.findAndCount(
      Project,
      { state },
      {
        limit,
        offset: page * limit,
        orderBy: { id: 'DESC' },
        populate: ['currency', 'owner'],
      }
    );
    return { rows, count };
  }

  /**
   * Retrieves all VIP projects that are in specific funding phases.
   *
   * @returns {Promise<Project[]>} A promise that resolves to an array of VIP projects.
   */
  async getAllVIPProjects(): Promise<Project[]> {
    return await this.em.find(
      Project,
      {
        vip: true,
        state: { $in: [ProjectStates.UPCOMING, ProjectStates.FUNDING_PHASE_1, ProjectStates.FUNDING_PHASE_2, ProjectStates.FUNDING_PHASE_3] },
      },
      { populate: ['currency', 'owner'] }
    );
  }

  /**
   * Retrieves all projects owned by a specific owner.
   *
   * @param {number} ownerId - The ID of the owner whose projects to retrieve.
   * @returns {Promise<Project[]>} A promise that resolves to an array of projects owned by the specified owner.
   */
  async getAllProjectsByOwner(ownerId: number): Promise<Project[]> {
    return await this.em.find(Project, { owner: { id: ownerId } }, { populate: ['currency', 'owner'] });
  }

  /**
   * Searches for projects by name.
   *
   * @param {string} search - The search string to match project names against.
   * @returns {Promise<Project[]>} A promise that resolves to an array of projects that match the search string.
   */
  async searchProjects(search: string): Promise<Project[]> {
    return await this.em.find(Project, { name: { $like: `%${search}%` } }, { populate: ['currency', 'owner'] });
  }

  /**
   * Retrieves all projects in which a specific user has invested.
   *
   * @param {number} userId - The ID of the user whose invested projects to retrieve.
   * @returns {Promise<Project[]>} A promise that resolves to an array of projects in which the specified user has invested.
   */
  async getAllInvestedProjects(userId: number): Promise<Project[]> {
    return await this.em.find(Project, { owner: { id: userId } }, { populate: ['currency', 'owner'] });
  }
}
