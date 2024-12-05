import { Tier } from './tier.entity';

/**
 * Provides TierRepository with Tier model.
 */
export const tiersProviders = [
  {
    provide: 'TierRepository',
    useValue: Tier,
  },
];
