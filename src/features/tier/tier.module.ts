import { Module } from '@nestjs/common';

import { DatabaseModule } from "@/database/database.module";

import { TierController } from './tier.controller';
import { tierProviders } from './tier.providers';
import { TierService } from './tier.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TierController],
  providers: [TierService, ...tierProviders]
})
export class TierModule {}
