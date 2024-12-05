import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  DataType,
  HasMany,
} from 'sequelize-typescript';

import { Currency } from '@/features/currency/currency.entity';
import { ProjectStates } from '@/features/project/project.types';
import { ProjectInvestment } from '@/features/projectInvestment/projectInvestment.entity';
import { User } from '@/features/user/user.entity';

@Table
export class Project extends Model {
  // Information
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    defaultValue: ProjectStates.DRAFT,
    type: DataType.INTEGER,
  })
  state: ProjectStates;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  slug: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  photoUrl: string;

  @Column({
    type: DataType.STRING,
  })
  bannerUrl: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  vip: boolean;

  // Project documents
  @Column({
    type: DataType.STRING,
  })
  whitepaperUrl: string;

  @Column({
    type: DataType.STRING,
  })
  litepaperUrl: string;

  @Column({
    type: DataType.STRING,
  })
  tokenomicsUrl: string;

  // Project comments
  @Column({
    type: DataType.STRING,
  })
  comments: string;

  // Raising funds information
  @Column({
    type: DataType.DECIMAL,
  })
  amountToRaise: number;

  @Column({
    type: DataType.DECIMAL,
  })
  threshold: number;

  @Column({
    type: DataType.DATE,
  })
  startDate: Date;

  // Token Information
  @Column({
    type: DataType.DOUBLE,
  })
  tokensSupply: number;

  @Column({
    type: DataType.DOUBLE,
  })
  tokensForSale: number;

  @Column({
    type: DataType.STRING,
  })
  tokenName: number;

  @Column({
    type: DataType.INTEGER,
  })
  tokenDecimals: number;

  // Vesting Information
  @Column({
    type: DataType.DATE,
  })
  TGEDate: Date;

  @Column({
    type: DataType.INTEGER,
  })
  UnlockTokensTGE: number;

  @Column({
    type: DataType.INTEGER,
  })
  cliff: number;

  @Column({
    type: DataType.INTEGER,
  })
  vestingDays: number;

  // Social Networks
  @Column({
    type: DataType.STRING,
  })
  instagramUrl: string;

  @Column({
    type: DataType.STRING,
  })
  xUrl: string;

  @Column({
    type: DataType.STRING,
  })
  discordUrl: string;

  @Column({
    type: DataType.STRING,
  })
  telegramUrl: string;

  @Column({
    type: DataType.STRING,
  })
  mediumUrl: string;

  // Relationships
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  ownerId: number;

  @BelongsTo(() => User)
  owner: User;

  @ForeignKey(() => Currency)
  @Column({
    type: DataType.INTEGER,
  })
  currencyId: number;

  @BelongsTo(() => Currency)
  currency: Currency;

  @HasMany(() => ProjectInvestment)
  projectInvestments: ProjectInvestment[];
}
