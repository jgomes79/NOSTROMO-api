import { IsBoolean, IsNumber } from 'class-validator';

export class ProjectVoteDTO {
  @IsNumber()
  projectId: number;

  @IsBoolean()
  vote: boolean;
}

export class ProjectVoteResponseDTO {
    @IsNumber()
    yes: number;

    @IsNumber()
    no: number;
    
    @IsNumber()
    total: number;
}