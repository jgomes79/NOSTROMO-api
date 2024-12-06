import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';
import { projectProviders } from '@/features/project/project.providers';

import { ProjectInvestmentModule } from '../projectInvestment/projectInvestment.module';
import { ProjectInvestmentService } from '../projectInvestment/projectInvestment.service';
import { ProjectRegistrationModule } from '../projectRegistration/projectRegistration.module';
import { ProjectRegistrationService } from '../projectRegistration/projectRegistration.service';
import { ProjectVoteModule } from '../projectVote/projectVote.module';
import { ProjectVoteService } from '../projectVote/projectVote.service';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

/**
 * Module that provides user-related services and controllers.
 */
@Module({
  imports: [DatabaseModule, ProjectInvestmentModule, ProjectRegistrationModule, ProjectVoteModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectInvestmentService, ProjectRegistrationService, ProjectVoteService, ...projectProviders],
})
export class ProjectModule {}

