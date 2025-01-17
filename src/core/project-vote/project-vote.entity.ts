import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';

import { Project } from '@/core/project/project.entity';
import { Tier } from '@/core/tier/tier.entity';
import { User } from '@/core/user/user.entity';

@Entity({
  tableName: 'project-votes',
})
export class ProjectVote {
  // Information
  @PrimaryKey()
  id: number;
  
  @Property({ type: 'boolean' })
  vote: boolean;

  @Property()
  createdAt: Date;

  @Property()
  updatedAt: Date;
  
  // Relationships
  @ManyToOne(() => User, { fieldName: 'userId' })
  user: User;
  
  @ManyToOne(() => Tier, { fieldName: 'tierId' })
  tier: Tier;
  
  @ManyToOne(() => Project, { fieldName: 'projectId' })
  project: Project;
}

