import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';
import { TypeEnum } from './../../../enums/type.enum';

export class TransactionsCategoryDTO {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsIn([TypeEnum.Recipe, TypeEnum.Expense])
  readonly type: TypeEnum;
}
