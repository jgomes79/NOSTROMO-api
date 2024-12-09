import { Module } from '@nestjs/common';

import { ProjectRegistrationService } from './project-registration.service';

@Module({
  providers: [ProjectRegistrationService],
  exports: [ProjectRegistrationService],
})
export class ProjectRegistrationModule {}
