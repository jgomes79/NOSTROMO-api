import { Get, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrencyService } from './currency.service';

/**
 * Controller for handling project-related HTTP requests.
 */
@ApiTags('Currencies Service')
@Controller('currencies-service')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('/')
  getById() {
    return {};
  }
}

