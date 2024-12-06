import { Tier } from './tier.entity';

/**
 * Provides TierRepository with Tier model.
 */
export const tierProviders = [
  {
    provide: 'TierRepository',
    useValue: Tier,
  },
];
