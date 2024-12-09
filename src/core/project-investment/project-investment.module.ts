import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { ProjectInvestment } from './project-investment.entity';
import { ProjectInvestmentService } from './project-investment.service';

@Module({
  imports: [MikroOrmModule.forFeature([ProjectInvestment])],
  providers: [ProjectInvestmentService],
  exports: [ProjectInvestmentService],
})
export class ProjectInvestmentModule {}
