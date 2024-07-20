import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email',
  })
  public email: string;

  @ApiProperty({
    example: '2024.07.12',
    description: 'User register date',
  })
  public registerDate: string;

  @ApiProperty({
    example: 'Ivan',
    description: 'User name',
  })
  public userName: string;

  @ApiProperty({
    example: '123456',
    description: 'User password',
  })
  public userPassword: string;

  @ApiProperty({
    example: 'admin',
    description: 'User role',
  })
  public role: string;
}
