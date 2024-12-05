import { Sequelize } from 'sequelize-typescript';

import { Currency } from '@/features/currency/currency.entity';
import { Project } from '@/features/project/project.entity';
import { ProjectInvestment } from '@/features/projectInvestment/projectInvestment.entity';
import { ProjectRegistration } from '@/features/projectRegistration/projectRegistration.entity';
import { ProjectVote } from '@/features/projectVote/projectVote.entity';
import { Tier } from '@/features/tier/tier.entity';
import { User } from '@/features/user/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,

        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: true,
      });
      sequelize.addModels([Project, ProjectVote, ProjectInvestment, ProjectRegistration, User, Tier, Currency]);
      await sequelize.sync({
        alter: true,
      });
      return sequelize;
    },
  },
];

