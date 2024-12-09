import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { TierController } from './tier.controller';
import { Tier } from './tier.entity';
import { TierService } from './tier.service';

@Module({
  imports: [MikroOrmModule.forFeature([Tier])],
  controllers: [TierController],
  providers: [TierService],
})
export class TierModule {}
