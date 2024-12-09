import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { User } from '@/core/user/user.entity';

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
    const wallet = signature;
    const user = this.em.create(User, {
      wallet,
      type: UserTypes.USER,
      tier: null
    });
    await this.em.persistAndFlush(user);
    return user;
  }
}
