import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';

import { Project } from '@/features/project/project.entity';
import { UserTypes } from '@/features/user/user.types';
import { Tier } from '@/features/tier/tier.entity';

@Table
export class User extends Model {
  // Basic Information
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  wallet: string;

  @Column({
    defaultValue: UserTypes.USER,
    type: DataType.ENUM(...Object.values(UserTypes)),
  })
  type: UserTypes;

  // Relationships
  @ForeignKey(() => Tier)
  @Column({
    type: DataType.INTEGER,
  })
  tierId: number;

  @BelongsTo(() => Tier)
  tier: Tier;

  @HasMany(() => Project)
  projects: Project[];
}
