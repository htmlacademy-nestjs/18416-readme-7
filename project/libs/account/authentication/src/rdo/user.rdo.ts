import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    example: '34234dsdsfsdf',
    description: 'User id',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    example: 'Ivan',
    description: 'User name',
  })
  @Expose()
  public userName: string;

  @ApiProperty({
    example: '2024.07.12',
    description: 'User register date',
  })
  @Expose()
  public registerDate: string;

  @ApiProperty({
    example: 'ivan@yandex.ru',
    description: 'User email',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    example: 'admin',
    description: 'User role',
  })
  @Expose()
  public role: string;
}
