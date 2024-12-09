import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

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
  providers: [ProjectService],
})
export class ProjectModule {}

