import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DetailedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User login',
    example: 'Keks',
  })
  @Expose()
  public login: string;

  @ApiProperty({
    description: 'User created date',
    example: '2021-08-01T00:00:00.000Z',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'User posts count',
    example: 10,
  })
  @Expose()
  public postsCount: number;
}
