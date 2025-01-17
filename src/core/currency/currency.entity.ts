import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';

import { Project } from '../project/project.entity';

@Entity({ tableName: 'currencies' })
export class Currency {
  @PrimaryKey()
  id: number;

  @Property({ type: 'string' })
  name: string;

  @Property({ type: 'number'})
  chainId: number;

  @Property({ type: 'string' })
  chain: string;

  @Property({ type: 'string', nullable: true })
  address: string | null;

  @Property({ type: 'boolean', default: true})
  isActive: boolean;

  @Property()
  createdAt: Date;

  @Property()
  updatedAt: Date;

  // Relationships
  @OneToMany(() => Project, project => project.currency, { eager: true })
  projects = new Collection<Project>(this);
}
