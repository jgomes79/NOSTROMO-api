import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { CurrencyModule } from '@/core/currency/currency.module';
import { ProjectModule } from '@/core/project/project.module';
import { ProjectInvestmentModule } from '@/core/project-investment/project-investment.module';
import { ProjectRegistrationModule } from '@/core/project-registration/project-registration.module';
import { ProjectVoteModule } from '@/core/project-vote/project-vote.module';
import { TierModule } from '@/core/tier/tier.module';
import { UserModule } from '@/core/user/user.module';

import mikroOrmConfig, { entities } from './mikro-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(mikroOrmConfig),
    MikroOrmModule.forFeature(entities),
    MulterModule.register({
      dest: './files',
    }),

    ProjectModule,
    ProjectInvestmentModule,
    ProjectRegistrationModule,
    ProjectVoteModule,
    UserModule,
    CurrencyModule,
    TierModule,
  ],
  controllers: [],
})
export class AppModule {}
