import { Project } from '@/features/project/project.entity';

/**
 * Provides ProjectRepository with Project model.
 */
export const projectProviders = [
  {
    provide: 'ProjectRepository',
    useValue: Project,
  },
];
