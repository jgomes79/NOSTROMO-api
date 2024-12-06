import { ProjectVote } from './projectVote.entity';

/**
 * Provides ProjectVoteRepository with ProjectVote model.
 */
export const projectVoteProviders = [
  {
    provide: 'ProjectVoteRepository',
    useValue: ProjectVote,
  },
];
