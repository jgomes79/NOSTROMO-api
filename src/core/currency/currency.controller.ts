import { Get, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Currency } from './currency.entity';
import { CurrencyService } from './currency.service';

/**
 * Controller for handling currency-related HTTP requests.
 */
@ApiTags('Currencies Service')
@Controller('currencies-service')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  /**
   * Retrieves a currency by its ID.
   *
   * @param {number} id - The ID of the currency to retrieve.
   * @returns {Promise<any>} A promise that resolves to the currency with the specified ID.
   */
  @Get('/currencies/:id')
  async getCurrency(@Param('id') id: number): Promise<any> {
    return await this.currencyService.getById(id);
  }

  /**
   * Retrieves all currencies.
   *
   * @returns {Promise<any[]>} A promise that resolves to an array of all currencies.
   */
  @Get('/currencies')
  async getAllCurrencies(): Promise<Currency[]> {
    return await this.currencyService.getAllCurrencies();
  }
}
