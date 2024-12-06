import { Module } from '@nestjs/common';

import { projectVoteProviders } from './projectVote.providers';
import { ProjectVoteService } from './projectVote.service';

@Module({
  providers: [ProjectVoteService, ...projectVoteProviders],
  exports: [ProjectVoteService],
})
export class ProjectVoteModule {}
