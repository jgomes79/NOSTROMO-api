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

  /**
   * Updates the tier of a specific user.
   *
   * @param {string} walletAddress - The wallet address of the user whose tier needs to be updated.
   * @param {number} tierId - The ID of the new tier to be assigned to the user.
   * @returns {Promise<any>} A promise that resolves with the updated user information.
   */
  @Put('/user/:walletAddress/tier/:tierId')
  async changeUserTier(@Param('walletAddress') walletAddress: string, @Param('tierId') tierId: number) {
    return await this.userService.changeUserTier(walletAddress, tierId);
  }

  @Delete('/user/:id/tier')
  async removeUserTier(@Param('id') id: number) {
    return await this.userService.removeUserTier(id);
  }
}

