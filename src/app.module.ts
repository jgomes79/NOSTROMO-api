import { MySqlDriver } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Currency } from '@/core/currency/currency.entity';
import { Project } from '@/core/project/project.entity';
import { ProjectInvestment } from '@/core/project-investment/project-investment.entity';
import { ProjectRegistration } from '@/core/project-registration/project-registration.entity';
import { ProjectVote } from '@/core/project-vote/project-vote.entity';
import { User } from '@/core/user/user.entity';

const logger = new Logger('MikroORM');

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
      entities: [User, Currency, Project, ProjectInvestment, ProjectVote, ProjectRegistration],
      driver: MySqlDriver,
      highlighter: new SqlHighlighter(),
      logger: logger.log.bind(logger),
    }),
  ],
  controllers: [],
})
export class AppModule {}
