import { Inject, Injectable } from '@nestjs/common';

import { Project } from '@/project/project.entity';
import { User } from '@/user/user.entity';

import { ProjectVoteResponseDTO } from './projectVote.dto';
import { ProjectVote } from './projectVote.entity';

@Injectable()
export class ProjectVoteService {
  constructor(
    @Inject('ProjectVoteRepository')
    private projectVoteRepository: typeof ProjectVote,
  ) {}

  /**
   * Retrieves a ProjectVote by its ID.
   *
   * @param {number} id - The ID of the project to retrieve.
   * @returns {Promise<ProjectVote>} A promise that resolves to the vote with the specified ID.
   */
  async getById(id: number): Promise<ProjectVote> {
    return await this.projectVoteRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Retrieves a All votes for a project.
   *
   * @param {number} projectId - The slug of the project to retrieve.
   * @returns {Promise<ProjectVote[]>} A promise that resolves to the project with the specified slug.
   */
  async getAllVotesForProject(projectId: number): Promise<ProjectVote[]> {
    return await this.projectVoteRepository.findAll({
      where: {
        projectId,
      },
      include: [Project, User],
    });
  }

 /**
   * Retrieves a vote state for a project.
   *
   * @param {number} projectId - The slug of the project to retrieve.
   * @returns {Promise<ProjectVote[]>} A promise that resolves to the project with the specified slug.
   */
    async getVoteStateForProject(projectId: number): Promise<ProjectVoteResponseDTO> {
        const votes = await this.projectVoteRepository.findAndCountAll({
          where: {
            projectId,
          },
          include: [Project, User],
        });

        let countYes = 0;
        let countNo = 0;

        for (let i = 0; i < votes.rows.length; i++) {
            if (votes.rows[i].vote) {
                countYes++;
            } else {
                countNo++;
            }
        }

        const result: ProjectVoteResponseDTO = {
            yes: countYes,
            no: countNo,
            total: votes.count
        };

        return result;
    }
}
