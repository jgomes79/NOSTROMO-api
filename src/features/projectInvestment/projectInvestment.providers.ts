import { ProjectInvestment } from '@/features/projectInvestment/projectInvestment.entity';

/**
 * Provides ProjectInvestmentRepository with ProjectInvestment model.
 */
export const projectInvestmentProviders = [
  {
    provide: 'ProjectInvestmentRepository',
    useValue: ProjectInvestment,
  },
];
