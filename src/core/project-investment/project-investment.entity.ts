import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';

import { Project } from '../project/project.entity';

@Entity({ tableName: 'project-investments' })
export class ProjectInvestment {
  // Information
  @PrimaryKey()
  id: number;
  
  @Property({ type: 'double' })
  amount: number;

  // Relationships
  @ManyToOne()
  project: Project;
}