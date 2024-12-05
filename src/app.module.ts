import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CurrencyModule } from '@/features/currency/currency.module';
import { ProjectModule } from '@/features/project/project.module';
import { UserModule } from '@/features/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), ProjectModule, UserModule, CurrencyModule],
  controllers: [],
})
export class AppModule {}

