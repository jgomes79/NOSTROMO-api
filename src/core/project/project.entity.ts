import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';

import { Currency } from '@/core/currency/currency.entity'; // Import Currency entity
import { User } from '@/core/user/user.entity';

import { ProjectStates } from './project.types';

@Entity()
export class Project {
  // Information
  @PrimaryKey()
  id: number;

  @Property({ default: ProjectStates.DRAFT })
  state: ProjectStates;

  @Property()
  name: string;

  @Property()
  slug: string;

  @Property({ type: 'text' })
  description: string;

  @Property()
  photoUrl: string;

  @Property()
  bannerUrl: string;

  @Property({ default: false })
  vip: boolean;

  // Project documents
  @Property()
  whitepaperUrl: string;

  @Property()
  litepaperUrl: string;

  @Property()
  tokenomicsUrl: string;

  // Project comments
  @Property()
  comments: string;

  // Raising funds information
  @Property({ type: 'decimal' })
  amountToRaise: number;

  @Property({ type: 'decimal' })
  threshold: number;

  @Property({ type: 'date' })
  startDate: Date;

  // Token Information
  @Property({ type: 'double' })
  tokensSupply: number;

  @Property({ type: 'double' })
  tokensForSale: number;

  @Property()
  tokenName: string;

  @Property()
  tokenDecimals: number;

  // Vesting Information
  @Property({ type: 'date' })
  TGEDate: Date;

  @Property()
  unlockTokensTGE: number;

  @Property()
  cliff: number;

  @Property()
  vestingDays: number;

  // Social Networks
  @Property()
  instagramUrl: string;

  @Property()
  xUrl: string;

  @Property()
  discordUrl: string;

  @Property()
  telegramUrl: string;

  @Property()
  mediumUrl: string;

  @Property({ type: 'date' })
  createdAt: Date;

  // Relationships
  @ManyToOne(() => User)
  owner: User;

  @ManyToOne(() => Currency)
  currency: Currency;
}
