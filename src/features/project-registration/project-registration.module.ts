import { Module } from '@nestjs/common';

import { projectRegistrationProviders } from './project-registration.providers';
import { ProjectRegistrationService } from './project-registration.service';

@Module({
  providers: [ProjectRegistrationService, ...projectRegistrationProviders],
  exports: [ProjectRegistrationService],
})
export class ProjectRegistrationModule {}
