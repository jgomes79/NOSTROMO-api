import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CurrencyModule } from '@/currency/currency.module';
import { ProjectModule } from '@/project/project.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), ProjectModule, UserModule, CurrencyModule],
  controllers: [],
})
export class AppModule {}

