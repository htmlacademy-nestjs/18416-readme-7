import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'john@yandex.com',
    description: 'User email',
  })
  public email: string;

  @ApiProperty({
    example: '123456789',
    description: 'User password',
  })
  public password: string;
}
