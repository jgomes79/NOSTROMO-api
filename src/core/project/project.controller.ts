import {
  Get,
  Controller,
  Delete,
  Param,
  Query,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { ProjectInvestmentService } from '@/core/project-investment/project-investment.service';
import { ProjectRegistrationService } from '@/core/project-registration/project-registration.service';
import { ProjectVoteDTO } from '@/core/project-vote/project-vote.dto';
import { ProjectVoteService } from '@/core/project-vote/project-vote.service';

import { CreateOrEditProjectDTO, CreateProjectInvestmentDTO, ProjectResponseDTO, ProjectsResponseDTO, ReviewProjectRequestDTO } from './project.dto';
import { ProjectService } from './project.service';
import { ProjectFiles, ProjectStates } from './project.types';

/**
 * Controller for handling project-related HTTP requests.
 */
@ApiTags('Projects Service')
@Controller('projects-service')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly projectInvestmentService: ProjectInvestmentService,
    private readonly projectVoteService: ProjectVoteService,
    private readonly projectRegistrationService: ProjectRegistrationService,
  ) {}

  /**
   * Fetches a project by its slug.
   * @param slug - The slug of the project to fetch.
   * @returns A promise that resolves to a project object.
   */
  @Get('/project/:slug')
  async getProject(@Param('slug') slug: string) {
    const project = await this.projectService.getBySlug(slug);
    
    return new ProjectResponseDTO(project);
  }

  /**
   * Creates a new investment for a project.
   * @param projectId - The ID of the project to create the investment for.
   * @param data - The data for the investment, validated against CreateProjectInvestmentDTO.
   * @returns An empty object.
   */
  @Post('/project/:projectId/investment')
  async createInvestment(@Param('projectId') projectId: number, @Body() data: CreateProjectInvestmentDTO) {
    console.log(projectId, data);
    await this.projectInvestmentService.getById(projectId);
    return {};
  }
  /**
   * Deletes a project by its ID.
   * @param projectId The ID of the project to delete.
   * @returns A partial project object.
   */
  @Delete('/project/:projectId')
  async deleteProject() {
    return {};
  }

  /**
   * Fetches all projects with a specified state.
   * @param state The state of the projects to fetch.
   * @param page The page number for pagination.
   * @param limit The number of projects per page.
   * @returns A list of partial project objects.
   */
  @Get('/projects/:state')
  async getAllProjects(
    @Param('state') state: ProjectStates,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const { rows, count } = await this.projectService.getAllProjects(state, page, limit);
    return new ProjectsResponseDTO({ rows, count });
  }

  /**
   * Creates a new project with the provided data and files.
   * @param body - The data for creating or editing the project, validated against CreateOrEditProjectDTO.
   * @param files - The files associated with the project, such as photo, banner, tokenImage, litepaper, tokenomics, and whitepaper.
   */
  @Post('/projects/create')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'photo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'tokenImage', maxCount: 1 },
    { name: 'litepaper', maxCount: 1 },
    { name: 'tokenomics', maxCount: 1 },
    { name: 'whitepaper', maxCount: 1 },
  ]))
  async createProject(
    @Body() body: CreateOrEditProjectDTO,
    @UploadedFiles() files: ProjectFiles
  ) {
    const project = await this.projectService.createProject(body, files);
    return new ProjectResponseDTO(project);
  }

  /**
   * Updates an existing project with the provided data and files.
   * @param projectId - The ID of the project to update.
   * @param body - The data for updating the project, validated against CreateOrEditProjectDTO.
   * @param files - The files associated with the project, such as photo, banner, tokenImage, litepaper, tokenomics, and whitepaper.
   * @returns A ProjectResponseDTO containing the updated project details.
   */
  @Post('/projects/:projectId/update')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'photo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'tokenImage', maxCount: 1 },
    { name: 'litepaper', maxCount: 1 },
    { name: 'tokenomics', maxCount: 1 },
    { name: 'whitepaper', maxCount: 1 },
  ]))
  async updateProject(
    @Param('projectId') projectId: number,
    @Body() body: CreateOrEditProjectDTO,
    @UploadedFiles() files: ProjectFiles
  ) {
    const project = await this.projectService.updateProject(projectId, body, files);
    return new ProjectResponseDTO(project);
  }

  /**
   * Fetches all VIP projects.
   * @returns A list of VIP project objects wrapped in a ProjectsResponseDTO.
   */
  @Get('/projects/vip')
  async getAllVIPProjects() {
    const projects = await this.projectService.getAllVIPProjects();
    return new ProjectsResponseDTO({ rows: projects, count: projects.length });
  }

  /**
   * Votes for a project.
   * @param data The data containing the vote information, validated against ProjectVoteDTO.
   */
  @Post('/projects/vote')
  async voteForProject(@Body() data: ProjectVoteDTO) {
    console.log(data);
  }

  /**
   * Fetches all invested projects.
   * @returns A list of invested project objects wrapped in a ProjectsResponseDTO.
   */
  @Get('/projects/invested')
  async getAllInvestedProjects() {
    const projects = await this.projectService.getAllInvestedProjects(1);
    return new ProjectsResponseDTO({ rows: projects, count: projects.length });
  }

  /**
   * Searches for projects based on a search query.
   * @param search The search query string.
   * @returns A list of project objects matching the search query, wrapped in a ProjectsResponseDTO.
   */
  @Get('/projects/search')
  async searchProjects(@Query('search') search: string) {
    const projects = await this.projectService.searchProjects(search);
    return new ProjectsResponseDTO({ rows: projects, count: projects.length });
  }

  /**
   * Fetches all projects by a specific owner.
   * @param ownerId The ID of the owner whose projects are to be fetched.
   * @returns A list of project objects owned by the specified owner, wrapped in a ProjectsResponseDTO.
   */
  @Get('/projects/owner/:ownerId')
  async getAllProjectsByOwner(@Param('ownerId') ownerId: number) {
    const projects = await this.projectService.getAllProjectsByOwner(ownerId);
    return new ProjectsResponseDTO({ rows: projects, count: projects.length });
  }
  
    /**
   * Fetches all projects by a specific owner.
   * @param walletAddress The wallet address whose projects are to be fetched.
   * @param state The state of the projects to fetch.
   * @param page The page number for pagination.
   * @param limit The number of projects per page.
   * @returns A list of project objects owned by the specified wallet, wrapped in a ProjectsResponseDTO.
   */
  @Get('/projects/wallet/:walletAddress')
  async getAllProjectsByWallet(
    @Param('walletAddress') walletAddress: string,
    @Query('state') state: ProjectStates | 'all',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const projects = await this.projectService.getAllProjectsByWallet(walletAddress, state, page, limit);
    return new ProjectsResponseDTO({ rows: projects.rows, count: projects.count });
  }

  @Post('/projects/:projectId/publish')
  async publishProject(@Param('projectId') projectId: number) {
    const project = await this.projectService.publishProject(projectId);
    return new ProjectResponseDTO(project);
  }

  @Post('/projects/:projectId/review')
  async reviewProject(@Param('projectId') projectId: number, @Body() body: ReviewProjectRequestDTO) {
    const project = await this.projectService.reviewProject(projectId, body.response, body.comments);
    return new ProjectResponseDTO(project);
  }
}
