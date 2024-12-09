import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { ProjectInvestmentService } from '../project-investment/project-investment.service';
import { ProjectRegistrationService } from '../project-registration/project-registration.service';
import { ProjectVoteService } from '../project-vote/project-vote.service';

import { ProjectController } from './project.controller';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

/**
 * Module that provides project-related services and controllers.
 */
@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Project] }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectInvestmentService, ProjectRegistrationService, ProjectVoteService],
})
export class ProjectModule {}

