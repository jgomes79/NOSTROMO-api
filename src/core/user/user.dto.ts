import { User } from "./user.entity";

/**
 * Data Transfer Object for User.
 */
export class UserDTO {
  /**
   * The wallet address of the user.
   */
  wallet: string;

  /**
   * The tier of the user.
   */
  tier: string;

  /**
   * Initializes a new instance of the UserDTO class.
   * 
   * @param user - An instance of the User entity containing the wallet address and tier information of the user.
   */
  constructor(user: User) {
    this.wallet = user.wallet;
    this.tier = user.tier.name;
  }
}
