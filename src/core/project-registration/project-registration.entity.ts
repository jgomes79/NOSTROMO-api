import { Entity, PrimaryKey, ManyToOne } from '@mikro-orm/core';

import { Project } from '../project/project.entity';
import { User } from '../user/user.entity';

@Entity({
  tableName: 'projectRegistrations',
})
export class ProjectRegistration {
  // Information
  @PrimaryKey()
  id: number;

  // Relationships
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Project)
  project: Project;
}