import { Entity, PrimaryKey, ManyToOne, Property } from '@mikro-orm/core';

import { Project } from '../project/project.entity';
import { User } from '../user/user.entity';

@Entity({
  tableName: 'project-registrations',
})
export class ProjectRegistration {
  // Information
  @PrimaryKey()
  id: number;

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