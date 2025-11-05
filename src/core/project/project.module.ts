import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { AzureStorageService } from '@/lib/azure/storage';
import { SpacesStorageService } from "@/lib/digitalocean/spaces.service";

import { ProjectInvestmentService } from '../project-investment/project-investment.service';
import { ProjectRegistrationService } from '../project-registration/project-registration.service';
import { ProjectVoteService } from '../project-vote/project-vote.service';
import { UserService } from '../user/user.service';

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
  providers: [ProjectService, ProjectInvestmentService, ProjectRegistrationService, ProjectVoteService, AzureStorageService, SpacesStorageService, UserService],
})
export class ProjectModule {}

