import {
  Get,
  Controller,
  Delete,
  Param,
  Query,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProjectInvestmentService } from '@/core/project-investment/project-investment.service';
import { ProjectRegistrationService } from '@/core/project-registration/project-registration.service';
import { ProjectVoteDTO } from '@/core/project-vote/project-vote.dto';
import { ProjectVoteService } from '@/core/project-vote/project-vote.service';

import { CreateProjectDTO, CreateProjectInvestmentDTO, EditProjectDTO, InitializeProjectRequestDTO, InitializeProjectResponseDTO, ProjectResponseDTO, ProjectsResponseDTO } from './project.dto';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { ProjectStates } from './project.types';

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

  @Post('/initialize')
  async initializeProject(@Body() data: InitializeProjectRequestDTO) {
    const project = await this.projectService.initializeProject(data.walletAddress);
    return new InitializeProjectResponseDTO(project);
  }

  /**
   * Fetches a project by its slug.
   * @param slug - The slug of the project to fetch.
   * @returns A promise that resolves to a project object.
   */
  @Get('/project/:slugOrId')
  async getProject(@Param('slugOrId') slugOrId: string) {
    let project: Project | null = null;
    if (typeof slugOrId === 'string') {
      project = await this.projectService.getBySlug(slugOrId);
    } else {
      project = await this.projectService.getById(Number(slugOrId));
    }
    
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
   * Creates a new project with the provided data.
   * @param data - The data to create the project with, validated against CreateProjectDTO.
   * @returns A promise that resolves to a partial project object.
   */
  @Post('/projects/create')
  async createProject(@Body() data: CreateProjectDTO) {
    console.log(data);
  }

  /**
   * Edits a project by its ID.
   * @param data The data to update the project with.
   * @returns A partial project object.
   */
  @Patch('/project/:projectId')
  async editProject(@Body() data: EditProjectDTO) {
    console.log(data);
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
}
