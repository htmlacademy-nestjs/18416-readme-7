import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    example: '3242345656456t',
    description: 'User id',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    example: 'ivan@yandex.ru',
    description: 'User email',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    example: '3342dffsdfxczvsfdgf',
    description: 'User access token',
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
  })
  @Expose()
  public refreshToken: string;
}
