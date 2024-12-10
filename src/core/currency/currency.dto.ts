export class CurrencyDTO {
  id: number;
  name: string;
  chainId: number;
  chain: string;
  address: string;

  constructor(currency: { id: number; name: string; chainId: number; chain: string; address: string }) {
    Object.assign(this, currency);
  }
}