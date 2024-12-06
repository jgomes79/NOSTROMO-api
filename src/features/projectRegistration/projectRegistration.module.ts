import { Module } from '@nestjs/common';

import { projectRegistrationProviders } from './projectRegistration.providers';
import { ProjectRegistrationService } from './projectRegistration.service';

@Module({
  providers: [ProjectRegistrationService, ...projectRegistrationProviders],
  exports: [ProjectRegistrationService],
})
export class ProjectRegistrationModule {}
