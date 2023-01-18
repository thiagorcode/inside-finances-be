import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionsDTO {
  @ApiProperty()
  description: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  isPaid: boolean;

  @ApiProperty()
  originCreate?: 'web' | 'telegram';

  @ApiProperty()
  type: '+' | '-';

  @ApiProperty()
  specification?: string;

  @ApiProperty()
  bank?: string;

  @ApiProperty()
  userId: string;
}
