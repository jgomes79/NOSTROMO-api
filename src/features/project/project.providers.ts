import { Project } from '@/features/project/project.entity';

import { projectInvestmentProviders } from '../projectInvestment/projectInvestment.providers';

/**
 * Provides ProjectRepository with Project model.
 */
export const projectProviders = [
  {
    provide: 'ProjectRepository',
    useValue: Project,
  },
  ...projectInvestmentProviders,
];
