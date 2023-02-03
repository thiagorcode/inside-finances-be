import { TypeEnum } from './../../../enums/type.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
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
  date: string;

  @ApiProperty()
  @IsBoolean()
  isPaid: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  originCreate?: 'web' | 'telegram';

  @ApiProperty()
  @IsNumber()
  /**
   * TODO: Deixei assim por que o usuário poderia informar a parcela inicial como por exemplo 34
   * e a final 44 e isso causaria um erro. Pensar em outra lógica
   */
  @Max(100)
  @IsOptional()
  finalInstallment?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  installment?: number;

  @ApiProperty()
  @IsEnum(TypeEnum)
  type: TypeEnum;

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
