import { Sequelize } from 'sequelize-typescript';

import { Currency } from '@/currency/currency.entity';
import { Project } from '@/project/project.entity';
import { ProjectInvestment } from '@/projectInvestment/projectInvestment.entity';
import { ProjectRegistration } from '@/projectRegistration/projectRegistration.entity';
import { ProjectVote } from '@/projectVote/projectVote.entity';
import { Tier } from '@/tier/tier.entity';
import { User } from '@/user/user.entity';

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

