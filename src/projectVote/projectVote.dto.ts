import { IsNumber } from 'class-validator';

export class ProjectVoteResponseDTO {
    @IsNumber()
    yes: number;
    @IsNumber()
    no: number;
    @IsNumber()
    total: number;
}