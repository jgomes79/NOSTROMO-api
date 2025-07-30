import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';

import { Project } from '@/core/project/project.entity';
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
  
  @ManyToOne(() => Project, { fieldName: 'projectId' })
  project: Project;
}

