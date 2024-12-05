import { ProjectInvestment } from '@/projectInvestment/projectInvestment.entity';

/**
 * Provides ProjectInvestmentRepository with ProjectInvestment model.
 */
export const projectProviders = [
  {
    provide: 'ProjectInvestmentRepository',
    useValue: ProjectInvestment,
  },
];
