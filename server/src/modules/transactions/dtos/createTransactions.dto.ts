import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionsDTO {
  @ApiProperty()
  description: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  year: number;

  // month: number;
  // day: number;
  @ApiProperty()
  yearMonth: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  dtCreate: Date;

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
  user: string;
}
