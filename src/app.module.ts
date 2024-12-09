import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CurrencyModule } from './features/currency/currency.module';
import { ProjectModule } from './features/project/project.module';
import { ProjectInvestmentModule } from './features/project-investment/project-investment.module';
import { ProjectRegistrationModule } from './features/project-registration/project-registration.module';
import { ProjectVoteModule } from './features/project-vote/project-vote.module';
import { TierModule } from './features/tier/tier.module';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
      autoLoadEntities: true,
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
