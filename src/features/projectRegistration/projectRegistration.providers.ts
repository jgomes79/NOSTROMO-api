import { ProjectRegistration } from './projectRegistration.entity';

/**
 * Provides ProjectRegistrationRepository with ProjectRegistration model.
 */
export const projectRegistrationProviders = [
  {
    provide: 'ProjectRegistrationRepository',
    useValue: ProjectRegistration,
  },
];
