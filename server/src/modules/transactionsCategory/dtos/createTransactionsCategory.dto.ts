import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString, IsUUID } from 'class-validator';

export class TransactionsCategoryDTO {
  @ApiProperty()
  @IsUUID()
  readonly id: number;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsIn(['+', '-'])
  readonly type: '+' | '-';
}
