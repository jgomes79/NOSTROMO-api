import { readFileSync } from 'fs';

import { Options } from '@mikro-orm/core';
import { EntityCaseNamingStrategy, MySqlDriver } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';

import { Currency } from '@/core/currency/currency.entity';
import { Project } from '@/core/project/project.entity';
import { ProjectInvestment } from '@/core/project-investment/project-investment.entity';
import { ProjectRegistration } from '@/core/project-registration/project-registration.entity';
import { ProjectVote } from '@/core/project-vote/project-vote.entity';
import { Tier } from '@/core/tier/tier.entity';
import { User } from '@/core/user/user.entity';

// Load environment variables from .env file
config();

const logger = new Logger('MikroORM');
export const entities = [User, Currency, Project, ProjectInvestment, ProjectVote, ProjectRegistration, Tier];

const certificateDir = process.env.DB_CERTIFICATE_PATH || './src/certificates/db/DigiCertGlobalRootCA.crt.pem';

const mikroOrmConfig: Options = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  dbName: process.env.DB_NAME || 'test',
  entities: [User, Currency, Project, ProjectInvestment, ProjectVote, ProjectRegistration, Tier],
  driver: MySqlDriver,
  highlighter: new SqlHighlighter(),
  logger: logger.log.bind(logger),
  namingStrategy: EntityCaseNamingStrategy,
  driverOptions: {
    connection: {
      ssl: {
        ca: readFileSync(certificateDir)
      }
    }
  }
};

export default mikroOrmConfig;
