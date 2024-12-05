import { Inject, Injectable } from '@nestjs/common';

import { Project } from '@/project/project.entity';
import { User } from '@/user/user.entity';

import { ProjectRegistration } from './projectRegistration.entity';

@Injectable()
export class ProjectRegistrationService {
  constructor(
    @Inject('ProjectRegistrationRepository')
    private projectRegistrationRepository: typeof ProjectRegistration,
  ) {}

  /**
   * Retrieves a ProjectRegistration by its ID.
   *
   * @param {number} id - The ID of the ProjectRegistration to retrieve.
   * @returns {Promise<ProjectVote>} A promise that resolves to the ProjectRegistration with the specified ID.
   */
  async getById(id: number): Promise<ProjectRegistration> {
    return await this.projectRegistrationRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Retrieves a All registers for a project.
   *
   * @param {number} projectId - The slug of the project to retrieve.
   * @returns {Promise<ProjectRegistration[]>} A promise that resolves to the project with the specified slug.
   */
  async getAllVotesForProject(projectId: number): Promise<ProjectRegistration[]> {
    return await this.projectRegistrationRepository.findAll({
      where: {
        projectId,
      },
      include: [Project, User],
    });
  }
}
