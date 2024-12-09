import { Inject, Injectable } from '@nestjs/common';
// import { Signature } from '@qubic-lib/qubic-ts-library/dist/qubic-types/Signature';

import { Tier } from '@/features/tier/tier.entity';
import { User } from '@/features/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private userRepository: typeof User,
  ) {}

  /**
   * Retrieves a User by its ID.
   *
   * @param {string} id - The ID of the project to retrieve.
   * @returns {Promise<User>} A promise that resolves to the user with the specified ID.
   */
  async getById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
      include: [Tier],
    });
  }

  async getByWallet(wallet: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        wallet,
      },
      include: [Tier],
    });
  }

  async register(signature: string): Promise<User> {
    const wallet = signature; // TODO: verify signature
    return this.userRepository.create({
      wallet,
      type: 'user',
      tierId: null
    });
  }
}
