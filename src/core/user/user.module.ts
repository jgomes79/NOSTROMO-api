import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

/**
 * Module that provides user-related services and controllers.
 */
@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
