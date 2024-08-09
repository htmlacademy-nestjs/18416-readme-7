import { ApiProperty } from '@nestjs/swagger';
import { AuthenticationValidateMessages } from '../authentication.enum';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'john@yandex.com',
    description: 'User email',
  })
  @IsEmail({}, { message: AuthenticationValidateMessages.EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    example: '123456789',
    description: 'User password',
  })
  @IsString()
  public password: string;
}
