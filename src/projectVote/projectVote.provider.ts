import { ProjectVote } from './projectVote.entity';

/**
 * Provides ProjectVoteRepository with ProjectVote model.
 */
export const projectProviders = [
  {
    provide: 'ProjectVoteRepository',
    useValue: ProjectVote,
  },
];
