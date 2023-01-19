import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class FindAllWithQueryDto {
  userId: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  categoryId?: string;

  @IsOptional()
  @IsString()
  @MinLength(7)
  @MaxLength(7)
  date?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1)
  type?: '+' | '-';

  isPaid?: boolean;
}
