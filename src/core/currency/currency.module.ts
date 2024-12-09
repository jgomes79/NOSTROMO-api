import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from "@nestjs/common";

import { CurrencyController } from "./currency.controller";
import { Currency } from './currency.entity';
import { CurrencyService } from "./currency.service";

/**
 * Module that provides currency-related services and controllers.
 */
@Module({
  imports: [MikroOrmModule.forFeature([Currency])],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
