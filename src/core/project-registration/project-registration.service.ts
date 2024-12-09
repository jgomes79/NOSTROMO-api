import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { ProjectRegistration } from './project-registration.entity';

@Injectable()
export class ProjectRegistrationService {
  constructor(private readonly em: EntityManager) {}

  /**
   * Retrieves a ProjectRegistration by its ID.
   *
   * @param {number} id - The ID of the ProjectRegistration to retrieve.
   * @returns {Promise<ProjectRegistration>} A promise that resolves to the ProjectRegistration with the specified ID.
   */
  async getById(id: number): Promise<ProjectRegistration> {
    return await this.em.findOne(ProjectRegistration, { id });
  }

  /**
   * Retrieves all registers for a project.
   *
   * @param {number} projectId - The ID of the project to retrieve registrations for.
   * @returns {Promise<ProjectRegistration[]>} A promise that resolves to the project registrations with the specified project ID.
   */
  async getAllVotesForProject(projectId: number): Promise<ProjectRegistration[]> {
    return await this.em.find(ProjectRegistration, { project: { id: projectId } }, { populate: ['project', 'user'] });
  }
}
