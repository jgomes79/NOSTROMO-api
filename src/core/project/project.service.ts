import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { AzureStorageService } from '@/lib/azure/storage';

import { Currency } from '../currency/currency.entity';
import { User } from '../user/user.entity';

import { CreateOrEditProjectDTO } from './project.dto';
import { Project } from './project.entity';
import { ProjectFiles, ProjectStates } from './project.types';

@Injectable()
export class ProjectService {
  constructor(private readonly em: EntityManager, private readonly azureStorageService: AzureStorageService) {}

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
   * Updates the files associated with a project by uploading them to Azure Storage
   * and updating the project's file URLs.
   *
   * @param {Project} project - The project entity to update with new file URLs.
   * @param {ProjectFiles} files - An object containing the files to be uploaded, such as photo, banner, tokenImage, litepaper, tokenomics, and whitepaper.
   * @returns {Promise<Project>} A promise that resolves to the updated project with new file URLs.
   */
  async updateProjectFiles(project: Project, files: ProjectFiles): Promise<Project> {
    const photo = files.photo?.[0] ?? undefined;
    const banner = files.banner?.[0] ?? undefined;
    const tokenImage = files.tokenImage?.[0] ?? undefined;
    const litepaper = files.litepaper?.[0] ?? undefined;
    const tokenomics = files.tokenomics?.[0] ?? undefined;
    const whitepaper = files.whitepaper?.[0] ?? undefined;

    const fileUploadPromises = [];

    if (photo) {
        fileUploadPromises.push(this.azureStorageService.uploadImageToAzure(photo).then(url => project.photoUrl = url));
    }
    if (banner) {
        fileUploadPromises.push(this.azureStorageService.uploadImageToAzure(banner).then(url => project.bannerUrl = url));
    }
    if (tokenImage) {
        fileUploadPromises.push(this.azureStorageService.uploadImageToAzure(tokenImage).then(url => project.tokenImageUrl = url));
    }
    if (litepaper) {
        fileUploadPromises.push(this.azureStorageService.uploadImageToAzure(litepaper).then(url => project.litepaperUrl = url));
    }
    if (tokenomics) {
        fileUploadPromises.push(this.azureStorageService.uploadImageToAzure(tokenomics).then(url => project.tokenomicsUrl = url));
    }
    if (whitepaper) {
        fileUploadPromises.push(this.azureStorageService.uploadImageToAzure(whitepaper).then(url => project.whitepaperUrl = url));
    }

    await Promise.all(fileUploadPromises);

    return project;
  } 

  /**
   * Creates a new project with the provided data and initializes it with default values.
   *
   * @param {CreateOrEditProjectDTO} data - The data transfer object containing the project's details.
   * @param {Object} files - An object containing the files associated with the project, such as images and documents.
   * @returns {Promise<Project | null>} A promise that resolves to the newly created project or null if creation fails.
   * @throws Will throw an error if the project owner or currency is not found.
   */
  async createProject(data: CreateOrEditProjectDTO, files: ProjectFiles): Promise<Project | null> {
    const owner = await this.em.findOne(User, { wallet: data.walletAddress });
    if (!owner) {
      throw new Error('Owner not found');
    }

    const currency = await this.em.findOne(Currency, { id: 1 });
    if (!currency) {
      throw new Error('Currency not found');
    }

    let project = new Project();

    // Set basic project information
    project = await this.updateProjectFiles(project, files);

    // Set basic project information
    project.name = data.name;
    project.slug = data.slug;
    project.description = data.description;
    project.email = data.email;
    project.state = ProjectStates.DRAFT;

    // Set token-related information
    project.tokenName = ''
    project.tokensSupply = null
    project.tokenDecimals = null

    // Set fundraising-related information
    project.amountToRaise = null
    project.startDate = null
    project.threshold = null
    project.tokensForSale = null
    project.unlockTokensTGE = null

    // Set social media URLs
    project.discordUrl = data.discordUrl;
    project.telegramUrl = data.telegramUrl;
    project.instagramUrl = data.instagramUrl;
    project.xUrl = data.xUrl;
    project.mediumUrl = data.mediumUrl;

    // Set vesting-related information
    project.TGEDate = null;
    project.cliff = null
    project.vestingDays = null

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
  async updateProject(projectId: number, data: CreateOrEditProjectDTO, files: ProjectFiles): Promise<Project | null> {
    let project = await this.getById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    // Set basic project information
    project = await this.updateProjectFiles(project, files);

    // Update project information
    project.name = data.name;
    project.slug = data.slug;
    project.description = data.description;
    project.email = data.email;

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

  /**
   * Retrieves all projects owned by a specific wallet address with optional state filter and pagination.
   *
   * @param {Project['owner']['wallet']} walletAddress - The blockchain wallet address of the project owner
   * @param {(Project['state'] | 'all')} [state] - Optional project state filter. Use 'all' to retrieve projects in any state
   * @param {number} [page=0] - Zero-based page number for pagination
   * @param {number} [limit=10] - Maximum number of projects to return per page
   * @returns {Promise<{ rows: Project[]; count: number }>} Object containing paginated projects and total count
   * @throws {Error} If the database query fails
   */
  async getAllProjectsByWallet(
    walletAddress: Project['owner']['wallet'],
    state?: Project['state'] | 'all',
    page: number = 0,
    limit: number = 10
  ): Promise<{ rows: Project[]; count: number }> {
    const where = Number(state) !== ProjectStates.SENT_TO_REVIEW ? { owner: { wallet: walletAddress } } : {};

    if (state !== undefined && state !== 'all') {
      where['state'] = state;
    }

    const [rows, count] = await this.em.findAndCount(
      Project,
      where,
      {
        limit,
        offset: page * limit,
        orderBy: { id: 'DESC' },
        populate: ['currency', 'owner']
      }
    );

    return { rows, count };
  }

  async publishProject(projectId: number): Promise<Project> {
    const project = await this.em.findOneOrFail(Project, projectId, { populate: ['owner'] });
    project.state = ProjectStates.SENT_TO_REVIEW;
    await this.em.persistAndFlush(project);

    return project;
  }

  async reviewProject(projectId: number, response: number, comments: string): Promise<Project> {
    // response: 0 - rejected, 1 - approved, 2 - more info needed
    const project = await this.em.findOneOrFail(Project, projectId, { populate: ['owner'] });
    project.state = response == 2 ? ProjectStates.REQUEST_MORE_INFO : response == 1 ? ProjectStates.READY_TO_VOTE : ProjectStates.REJECTED;
    response == 2 ? project.comments = comments : null;
    await this.em.persistAndFlush(project);

    return project;
  }

  async getProjectsByStateAndUser(state: number, ownerId: number): Promise<Project[]> {
    return await this.em.find(Project, { state, owner: { id: ownerId } });
  }
}
