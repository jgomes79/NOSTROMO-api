import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';

import { Project } from '@/core/project/project.entity';
import { Tier } from '@/core/tier/tier.entity';
import { User } from '@/core/user/user.entity';

@Entity()
export class ProjectVote {
  // Information
  @PrimaryKey()
  id: number;
  
  @Property({ type: 'boolean' })
  vote: boolean;
  
  // Relationships
  @ManyToOne(() => User)
  user: User;
  
  @ManyToOne(() => Tier)
  tier: Tier;
  
  @ManyToOne(() => Project)
  project: Project;
}
