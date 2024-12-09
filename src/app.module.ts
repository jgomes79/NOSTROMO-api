import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CurrencyModule } from '@/features/currency/currency.module';
import { ProjectModule } from '@/features/project/project.module';
import { UserModule } from '@/features/user/user.module';
import { TierModule } from '@/features/tier/tier.module';

import { ProjectInvestmentModule } from './features/projectInvestment/projectInvestment.module';
import { ProjectRegistrationModule } from './features/projectRegistration/projectRegistration.module';
import { ProjectVoteModule } from './features/projectVote/projectVote.module';

@Module({
  imports: [ConfigModule.forRoot(), ProjectModule, ProjectInvestmentModule, ProjectRegistrationModule, ProjectVoteModule, UserModule, CurrencyModule, TierModule],
  controllers: [],
})
export class AppModule {}

