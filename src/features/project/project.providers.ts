import { Project } from '@/features/project/project.entity';

import { projectInvestmentProviders } from '../projectInvestment/projectInvestment.providers';
import { projectRegistrationProviders } from '../projectRegistration/projectRegistration.providers';
import { projectVoteProviders } from '../projectVote/projectVote.providers';

/**
 * Provides ProjectRepository with Project model.
 */
export const projectProviders = [
  {
    provide: 'ProjectRepository',
    useValue: Project,
  },
  ...projectInvestmentProviders,
  ...projectRegistrationProviders,
  ...projectVoteProviders
];
