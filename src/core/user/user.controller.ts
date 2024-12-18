import { Get, Controller, Param, Post, Put, Delete } from '@nestjs/common';
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

  @Put('/user/:id/tier/:tierId')
  async changeUserTier(@Param('id') id: number, @Param('tierId') tierId: number) {
    return await this.userService.changeUserTier(id, tierId);
  }

  @Delete('/user/:id/tier')
  async removeUserTier(@Param('id') id: number) {
    return await this.userService.removeUserTier(id);
  }
}

