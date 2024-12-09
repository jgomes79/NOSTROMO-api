import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { Currency } from './currency.entity';

@Injectable()
export class CurrencyService {
  constructor(private readonly em: EntityManager) {}

  /**
   * Retrieves a Currency by its ID.
   *
   * @param {number} id - The ID of the currency to retrieve.
   * @returns {Promise<Currency>} A promise that resolves to the currency with the specified ID.
   */
  async getById(id: number): Promise<Currency> {
    return await this.em.findOne(Currency, { id });
  }

  /**
   * Retrieves all active currencies.
   *
   * @returns {Promise<Currency[]>} A promise that resolves to an array of active currencies.
   */
  async getAllCurrencies(): Promise<Currency[]> {
    return await this.em.find(Currency, { isActive: true });
  }
}
