import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTransactionsDTO {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsInt()
  value: number;

  @ApiProperty()
  @IsUUID()
  categoryId: string;

  @ApiProperty()
  @IsInt()
  year: number;

  // month: number;
  // day: number;
  @ApiProperty()
  @IsString()
  yearMonth: string;

  @ApiProperty()
  @IsDate()
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
