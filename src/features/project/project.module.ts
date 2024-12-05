import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';
import { projectProviders } from '@/features/project/project.providers';

import { ProjectInvestmentModule } from '../projectInvestment/projectInvestment.module';
import { ProjectInvestmentService } from '../projectInvestment/projectInvestment.service';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

/**
 * Module that provides user-related services and controllers.
 */
@Module({
  imports: [DatabaseModule, ProjectInvestmentModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectInvestmentService, ...projectProviders],
})
export class ProjectModule {}

