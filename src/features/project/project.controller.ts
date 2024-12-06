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

import { ProjectInvestmentService } from '../projectInvestment/projectInvestment.service';
import { ProjectRegistrationService } from '../projectRegistration/projectRegistration.service';
import { ProjectVoteDTO } from '../projectVote/projectVote.dto';
import { ProjectVoteService } from '../projectVote/projectVote.service';

import { CreateProjectDTO, CreateProjectInvestmentDTO, EditProjectDTO, ProjectResponseDTO, ProjectsResponseDTO } from './project.dto';
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
    private readonly projectRegistrationService: ProjectRegistrationService,
    private readonly projectVoteService: ProjectVoteService,
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

  @Get('/projects/vip')
  async getAllVIPProjects() {
    const projects = await this.projectService.getAllVIPProjects();
    return new ProjectsResponseDTO({ rows: projects, count: projects.length });
  }

  @Post('/projects/vote')
  async voteForProject(@Body() data: ProjectVoteDTO) {
    console.log(data);
  }
}
