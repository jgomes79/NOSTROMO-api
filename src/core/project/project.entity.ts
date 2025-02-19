import { Entity, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';

import { Currency } from '@/core/currency/currency.entity'; 
import { User } from '@/core/user/user.entity';

import { ProjectInvestment } from '../project-investment/project-investment.entity';
import { ProjectRegistration } from '../project-registration/project-registration.entity';
import { ProjectVote } from '../project-vote/project-vote.entity';

import { ProjectStates } from './project.types';

@Entity({
  tableName: 'projects',
})
export class Project {
  // Information
  @Property({ type: 'number', autoincrement: true, primary: true })
  id!: number;

  @Property({ default: ProjectStates.DRAFT })
  state: ProjectStates;

  @Property()
  name: string;

  @Property()
  slug: string;

  @Property()
  email: string;

  @Property({ type: 'text', default: null, nullable: true })
  description: string | null;

  @Property({ type: 'text', default: null, nullable: true })
  photoUrl: string | null;

  @Property({ type: 'text', default: null, nullable: true })
  bannerUrl: string | null;

  @Property({ type: 'text', default: null, nullable: true })
  tokenImageUrl: string | null;

  @Property({ type: 'boolean', default: false })
  vip: boolean;

  // Project documents
  @Property({ type: 'text', default: null, nullable: true })
  whitepaperUrl: string | null;

  @Property({ type: 'text', default: null, nullable: true })
  litepaperUrl: string | null;

  @Property({ type: 'text', default: null, nullable: true })
  tokenomicsUrl: string | null;

  // Project comments
  @Property({ type: 'text', default: null, nullable: true })
  comments: string;

  // Raising funds information
  @Property({ type: 'decimal', default: null, nullable: true })
  amountToRaise: number | null;

  @Property({ type: 'decimal', default: null, nullable: true })
  threshold: number | null;

  @Property({ type: 'date', default: null, nullable: true })
  startDate: Date | null;

  // Token Information
  @Property({ type: 'number', default: null, nullable: true })
  tokensSupply: number | null;

  @Property({ type: 'number', default: null, nullable: true })
  tokensForSale: number | null;

  @Property({ type: 'text', default: null, nullable: true })
  tokenName: string;

  @Property({ type: 'number', default: null, nullable: true })
  tokenDecimals: number | null;

  // Vesting Information
  @Property({ type: 'date', default: null, nullable: true })
  TGEDate: Date;

  @Property({ type: 'double', default: null, nullable: true })
  unlockTokensTGE: number | null;

  @Property({ type: 'number', default: null, nullable: true })
  cliff: number | null;

  @Property({ type: 'number', default: null, nullable: true })
  vestingDays: number | null;

  // Social Networks
  @Property({ type: 'text', default: null, nullable: true })
  instagramUrl: string | null;

  @Property({ type: 'text', default: null, nullable: true })
  xUrl: string | null;

  @Property({ type: 'text', default: null, nullable: true })
  discordUrl: string | null;

  @Property({ type: 'text', default: null, nullable: true })
  telegramUrl: string | null;

  @Property({ type: 'text', default: null, nullable: true })
  mediumUrl: string | null;

  @Property()
  createdAt: Date;

  @Property()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, { fieldName: 'ownerId' })
  owner: User;

  @ManyToOne(() => Currency, { fieldName: 'currencyId' })
  currency: Currency;

  @OneToMany(() => ProjectInvestment, projectInvestment => projectInvestment.project)
  projectInvestments = new Collection<ProjectInvestment>(this);

  @OneToMany(() => ProjectVote, projectVote => projectVote.project)
  projectVotes = new Collection<ProjectVote>(this);

  @OneToMany(() => ProjectRegistration, projectRegistration => projectRegistration.project)
  projectRegistrations = new Collection<ProjectRegistration>(this);
}
