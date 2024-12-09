import { Module } from '@nestjs/common';

import { projectInvestmentProviders } from './projectInvestment.providers';
import { ProjectInvestmentService } from './projectInvestment.service';

@Module({
  providers: [ProjectInvestmentService, ...projectInvestmentProviders],
  exports: [ProjectInvestmentService],
})
export class ProjectInvestmentModule {}
