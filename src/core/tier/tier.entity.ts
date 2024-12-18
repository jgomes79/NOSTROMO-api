import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';

import { User } from '../user/user.entity';

@Entity({
  tableName: 'tiers',
})
export class Tier {
  // Basic Information
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  description: string;

  @Property({ default: 0 })
  stakeAmount: number;

  @Property({ type: 'double', default: 0 })
  poolWeight: number;

  @Property()
  beneficts: string;

  // Relationships
  @OneToMany(() => User, user => user.tier)
  users = new Collection<User>(this);
}