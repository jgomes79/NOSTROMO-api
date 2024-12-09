import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';

import { Currency } from '@/features/currency/currency.entity';
import { Project } from '@/features/project/project.entity';
import { User } from '@/features/user/user.entity';

@Entity({ tableName: 'project-investments' })
export class ProjectInvestment {
  // Information
  @PrimaryKey()
  id: number;
  
  @Property({ type: 'double' })
  amount: number;
  
  // Relationships
  @ManyToOne(() => Currency)
  currency: Currency;
  
  @ManyToOne(() => User)
  user: User;
  
  @ManyToOne(() => Project)
  project: Project;
}
