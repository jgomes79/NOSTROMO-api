import { IsBoolean, IsNumber } from 'class-validator';

/**
 * Data Transfer Object for project vote.
 */
export class ProjectVoteDTO {
  @IsNumber()
  projectId: number;

  @IsBoolean()
  vote: boolean;
}

/**
 * Data Transfer Object for project vote response.
 */
export class ProjectVoteResponseDTO {
  @IsNumber()
  yes: number;
  
  @IsNumber()
  no: number;
      
  @IsNumber()
  total: number;
}