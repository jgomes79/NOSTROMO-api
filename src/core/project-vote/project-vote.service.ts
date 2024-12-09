import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { ProjectVote } from './project-vote.entity';

@Injectable()
export class ProjectVoteService {
  constructor(private readonly em: EntityManager) {}

  /**
   * Retrieves a ProjectVote by its ID.
   *
   * @param {number} id - The ID of the project to retrieve.
   * @returns {Promise<ProjectVote>} A promise that resolves to the vote with the specified ID.
   */
  async getById(id: number): Promise<ProjectVote> {
    return await this.em.findOne(ProjectVote, { id });
  }

  /**
   * Retrieves all votes for a project.
   *
   * @param {number} projectId - The ID of the project to retrieve votes for.
   * @returns {Promise<ProjectVote[]>} A promise that resolves to the votes for the specified project.
   */
  async getAllVotesForProject(projectId: number): Promise<ProjectVote[]> {
    return await this.em.find(ProjectVote, { project: projectId }, { populate: ['user'] });
  }

  /**
   * Retrieves a vote state for a project.
   *
   * @param {number} projectId - The ID of the project to retrieve the vote state for.
   * @returns {Promise<{ yes: number, no: number, total: number }>} A promise that resolves to the vote state of the project.
   */
  async getVoteStateForProject(projectId: number): Promise<{ yes: number, no: number, total: number }> {
    const votes = await this.em.find(ProjectVote, { project: projectId });

    let countYes = 0;
    let countNo = 0;

    for (const vote of votes) {
      if (vote.vote) {
        countYes++;
      } else {
        countNo++;
      }
    }

    return {
      yes: countYes,
      no: countNo,
      total: votes.length,
    };
  }
}
