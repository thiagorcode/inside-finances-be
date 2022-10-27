import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateUserDTO } from './createUser.dto';

export class UpdateUserDto extends PartialType(CreateUserDTO) {
  @IsUUID()
  @ApiProperty()
  id: string;
}
