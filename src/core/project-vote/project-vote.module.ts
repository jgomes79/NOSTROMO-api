import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { ProjectVote } from './project-vote.entity';
import { ProjectVoteService } from './project-vote.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [ProjectVote] })],
  providers: [ProjectVoteService],
  exports: [ProjectVoteService],
})
export class ProjectVoteModule {}
