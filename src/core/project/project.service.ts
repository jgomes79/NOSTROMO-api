import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { Currency } from '../currency/currency.entity';
import { User } from '../user/user.entity';

import { CreateOrEditProjectDTO } from './project.dto';
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
   * Creates a new project with the provided data and initializes it with default values.
   *
   * @param {CreateOrEditProjectDTO} data - The data transfer object containing the project's details.
   * @param {Object} files - An object containing the files associated with the project, such as images and documents.
   * @returns {Promise<Project | null>} A promise that resolves to the newly created project or null if creation fails.
   * @throws Will throw an error if the project owner or currency is not found.
   */
  async createProject(data: CreateOrEditProjectDTO, files: { [fieldname: string]: Express.Multer.File[] }): Promise<Project | null> {
    const owner = await this.em.findOne(User, { wallet: data.walletAddress });
    if (!owner) {
      throw new Error('Owner not found');
    }

    const currency = await this.em.findOne(Currency, { id: 1 });
    if (!currency) {
      throw new Error('Currency not found');
    }

    const project = new Project();

    // Set basic project information
    project.name = data.name;
    project.slug = data.slug;
    project.description = data.description;
    project.state = ProjectStates.DRAFT;

    // Set token-related information
    project.tokenName = data.tokenName;
    project.tokensSupply = data.tokensSupply;
    project.tokenDecimals = data.tokenDecimals;

    // Set fundraising-related information
    project.amountToRaise = data.amountToRaise;
    project.startDate = new Date(data.startDate);
    project.threshold = data.threshold;
    project.tokensForSale = data.tokensForSale;
    project.unlockTokensTGE = data.unlockTokensTGE;

    // Set social media URLs
    project.discordUrl = data.discordUrl;
    project.telegramUrl = data.telegramUrl;
    project.instagramUrl = data.instagramUrl;
    project.xUrl = data.xUrl;
    project.mediumUrl = data.mediumUrl;

    // Set vesting-related information
    project.TGEDate = new Date(data.TGEDate);
    project.cliff = data.cliff;
    project.vestingDays = data.vestingDays;

    // Assign owner and currency
    project.owner = owner;
    project.currency = currency;

    // Set timestamps
    project.createdAt = new Date();
    project.updatedAt = new Date();

    await this.em.persistAndFlush(project);

    return project;
  }

  /**
   * Updates an existing project with the provided data and files.
   *
   * @param {number} projectId - The ID of the project to update.
   * @param {CreateOrEditProjectDTO} data - The data for updating the project, validated against CreateOrEditProjectDTO.
   * @param {{ [fieldname: string]: Express.Multer.File[] }} files - The files associated with the project, such as photo, banner, tokenImage, litepaper, tokenomics, and whitepaper.
   * @returns {Promise<Project | null>} A promise that resolves to the updated project or null if the project is not found.
   * @throws Will throw an error if the project is not found.
   */
  async updateProject(projectId: number, data: CreateOrEditProjectDTO, files: { [fieldname: string]: Express.Multer.File[] }): Promise<Project | null> {
    const project = await this.getById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    // Update project information
    project.name = data.name;
    project.slug = data.slug;
    project.description = data.description;

    // Update token-related information
    project.tokenName = data.tokenName;
    project.tokensSupply = data.tokensSupply;
    project.tokenDecimals = data.tokenDecimals;

    // Update fundraising-related information
    project.amountToRaise = data.amountToRaise;
    project.startDate = new Date(data.startDate);
    project.threshold = data.threshold;
    project.tokensForSale = data.tokensForSale;
    project.unlockTokensTGE = data.unlockTokensTGE;

    // Update social media URLs
    project.discordUrl = data.discordUrl;
    project.telegramUrl = data.telegramUrl;
    project.instagramUrl = data.instagramUrl;
    project.xUrl = data.xUrl;
    project.mediumUrl = data.mediumUrl;

    // Update vesting-related information
    project.TGEDate = new Date(data.TGEDate);
    project.cliff = data.cliff;
    project.vestingDays = data.vestingDays;

    // Update timestamps
    project.updatedAt = new Date();

    await this.em.persistAndFlush(project);
    return project;
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
