import { Module } from '@nestjs/common';

import { tierProviders } from './tier.providers';
import { TierService } from './tier.service';

@Module({
  providers: [TierService, ...tierProviders],
  exports: [TierService],
})
export class TierModule {}
