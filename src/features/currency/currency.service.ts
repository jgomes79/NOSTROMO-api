import { Inject, Injectable } from '@nestjs/common';

import { Currency } from '@/features/currency/currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @Inject('CurrencyRepository')
    private currencyRepository: typeof Currency,
  ) {}

  /**
   * Retrieves a Currency by its ID.
   *
   * @param {number} id - The ID of the currency to retrieve.
   * @returns {Promise<Currency>} A promise that resolves to the currency with the specified ID.
   */
  async getById(id: number): Promise<Currency> {
    return this.currencyRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getAllCurrencies(): Promise<Currency[]> {
    return await this.currencyRepository.findAll({
      where: {
        isActive: true
      }
    });
  }
}
