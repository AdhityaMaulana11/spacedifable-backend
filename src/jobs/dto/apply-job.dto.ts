import { IsOptional, IsString } from 'class-validator';

export class ApplyJobDto {
  @IsString()
  @IsOptional()
  cover_letter?: string;
}
