import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTransactionsDTO {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsUUID()
  categoryId: string;

  // month: number;
  // day: number;

  @ApiProperty()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsBoolean()
  isPaid: boolean;

  @ApiProperty()
  @IsString()
  originCreate?: 'web' | 'telegram';

  @ApiProperty()
  @IsString()
  type: '+' | '-';

  @ApiProperty()
  @IsString()
  @IsOptional()
  specification?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bank?: string;

  @ApiProperty()
  @IsUUID()
  userId: string;
}
