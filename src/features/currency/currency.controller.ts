import { Get, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrencyService } from './currency.service';

/**
 * Controller for handling project-related HTTP requests.
 */
@ApiTags('Currencies Service')
@Controller('currencies-service')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('/currencies/:id')
  async getCurrency(@Param('id') id: number) {
    return await this.currencyService.getById(id);
  }

  @Get('/currencies')
  async getAllCurrencies() {
    return await this.currencyService.getAllCurrencies();
  }
}

