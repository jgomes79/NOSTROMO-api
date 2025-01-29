import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { User } from '@/core/user/user.entity';

import { Tier } from '../tier/tier.entity';

import { UserTypes } from './user.types';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  /**
   * Retrieves a User by its ID.
   *
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<User>} A promise that resolves to the user with the specified ID.
   */
  async getById(id: number): Promise<User> {
    return await this.em.findOne(User, { id }, { populate: ['tier'] });
  }

  /**
   * Retrieves a User by its wallet.
   *
   * @param {string} wallet - The wallet of the user to retrieve.
   * @returns {Promise<User>} A promise that resolves to the user with the specified wallet.
   */
  async getByWallet(wallet: string): Promise<User> {
    return await this.em.findOne(User, { wallet }, { populate: ['tier'] });
  }

  /**
   * Registers a new user with the given signature.
   *
   * @param {string} signature - The signature to register the user.
   * @returns {Promise<User>} A promise that resolves to the newly registered user.
   */
  async register(signature: string): Promise<User> {
    const user = new User();
    user.wallet = signature;
    user.type = UserTypes.USER;
    
    // Fetch the tier first to ensure it exists
    const defaultTier = await this.em.findOne(Tier, { id: 1 });
    if (!defaultTier) {
      throw new Error('Default tier not found');
    }
    
    user.tier = defaultTier;
    user.createdAt = new Date();
    user.updatedAt = new Date();
    
    await this.em.persistAndFlush(user);
    return user;
  }

  /**
   * Changes the tier of a user identified by their wallet address.
   *
   * @param {User['wallet']} walletAddress - The wallet address of the user whose tier needs to be changed.
   * @param {Tier['id']} tierId - The ID of the new tier to be assigned to the user.
   * @returns {Promise<void>} A promise that resolves when the tier has been changed successfully.
   * @throws {Error} If the user or tier is not found.
   */
  async changeUserTier(walletAddress: User['wallet'], tierId: Tier['id']) {
    const user = await this.getByWallet(walletAddress);
    user.tier = await this.em.findOne(Tier, { id: tierId });
    await this.em.persistAndFlush(user);
  }

  async removeUserTier(id: number) {
    const user = await this.getById(id);
    user.tier = null;
    await this.em.persistAndFlush(user);
  }
}
