import { Entity, PrimaryKey, Property, ManyToOne, OneToMany } from '@mikro-orm/core';

import { Project } from '@/core/project/project.entity';
import { Tier } from '@/core/tier/tier.entity';

import { UserTypes } from './user.types';

@Entity({ tableName: 'users' })
export class User {
  // Basic Information
  @PrimaryKey()
  id: number;

  @Property()
  wallet: string;

  @Property({ default: UserTypes.USER, type: 'string' })
  type: UserTypes;

  // Relationships
  @ManyToOne(() => Tier)
  tier: Tier;

  @OneToMany(() => Project, project => project.owner)
  projects: Project[];
}
