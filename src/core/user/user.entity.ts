import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';

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

  @Property()
  createdAt: Date;

  @Property()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Tier, { fieldName: 'tierId' })
  tier: Tier;

  @OneToMany(() => Project, project => project.owner)
  projects = new Collection<Project>(this);
  user: any;
}
