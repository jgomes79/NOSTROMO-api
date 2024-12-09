import { Get, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from './user.entity';
import { UserService } from './user.service';

/**
 * Controller for handling project-related HTTP requests.
 */
@ApiTags('Users Service')
@Controller('users-service')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Retrieves a user by their wallet address.
   *
   * @param {string} wallet - The wallet address of the user to retrieve.
   * @returns {Promise<User>} A promise that resolves to a partial user object.
   */
  @Get('/user/:wallet')
  async getUser(@Param('wallet') wallet: string): Promise<User> {
    return await this.userService.getByWallet(wallet);
  }

  /**
   * Registers a new user by their wallet address.
   *
   * @param {string} wallet - The wallet address of the user to register.
   * @returns {Promise<Partial<User>>} A promise that resolves to a partial user object.
   */
  @Post('/user/:signature')
  async register(@Param('signature') signature: string): Promise<User> {
    return await this.userService.register(signature);
  }

  @Post('/user/tier/:id')
  async changeUserTier(@Param('id') tierId: number) {
    console.log({ tierId });
    return {};
  }
}
