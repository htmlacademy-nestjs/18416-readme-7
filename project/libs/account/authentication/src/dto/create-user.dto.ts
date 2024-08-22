import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsOptional, IsString } from 'class-validator';
import { AuthenticationValidateMessages } from '../authentication.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email',
  })
  @IsEmail({}, { message: AuthenticationValidateMessages.EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    example: '2024.07.12',
    description: 'User register date',
  })
  @IsISO8601(
    {},
    { message: AuthenticationValidateMessages.DATE_REGISTER_NOT_VALID }
  )
  public registerDate: string;

  @ApiProperty({
    example: 'Ivan',
    description: 'User name',
  })
  @IsString()
  public userName: string;

  @ApiProperty({
    example: '123456',
    description: 'User password',
  })
  @IsString()
  public userPassword: string;

  @ApiProperty({
    example: 'Role',
    description: 'admin',
  })
  @IsOptional()
  @IsString()
  public role: string;

  @ApiProperty({
    example: 'Avatar id',
    description: '323223rweffdsfs',
  })
  @IsOptional()
  @IsString()
  public avatarId: string;
}
