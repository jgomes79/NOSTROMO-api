import { readFileSync } from 'fs';

import { EntityCaseNamingStrategy, MySqlDriver } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Currency } from '@/core/currency/currency.entity';
import { CurrencyModule } from '@/core/currency/currency.module';
import { Project } from '@/core/project/project.entity';
import { ProjectModule } from '@/core/project/project.module';
import { ProjectInvestment } from '@/core/project-investment/project-investment.entity';
import { ProjectInvestmentModule } from '@/core/project-investment/project-investment.module';
import { ProjectRegistration } from '@/core/project-registration/project-registration.entity';
import { ProjectRegistrationModule } from '@/core/project-registration/project-registration.module';
import { ProjectVote } from '@/core/project-vote/project-vote.entity';
import { ProjectVoteModule } from '@/core/project-vote/project-vote.module';
import { Tier } from '@/core/tier/tier.entity';
import { TierModule } from '@/core/tier/tier.module';
import { User } from '@/core/user/user.entity';
import { UserModule } from '@/core/user/user.module';

const logger = new Logger('MikroORM');

const entities = [User, Currency, Project, ProjectInvestment, ProjectVote, ProjectRegistration, Tier];

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
      entities: [User, Currency, Project, ProjectInvestment, ProjectVote, ProjectRegistration, Tier],
      driver: MySqlDriver,
      highlighter: new SqlHighlighter(),
      logger: logger.log.bind(logger),
      namingStrategy: EntityCaseNamingStrategy,
      driverOptions: {
        connection: {
          ssl: {
            ca: readFileSync('./src/certificates/db/DigiCertGlobalRootCA.crt.pem')
          }
        }
      }
    }),
    MikroOrmModule.forFeature(entities),

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
