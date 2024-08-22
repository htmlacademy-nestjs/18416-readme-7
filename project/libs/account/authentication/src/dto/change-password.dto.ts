import { IsString, MinLength, MaxLength, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthenticationValidateParams } from '../authentication.enum';
import { AuthenticationValidateMessages } from '../authentication.enum';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString({ message: AuthenticationValidateMessages.PASSWORD_IS_NOT_STRING })
  @MinLength(AuthenticationValidateParams.PASSWORD_MIN_LENGTH, {
    message: AuthenticationValidateMessages.PASSWORD_MIN_LENGTH,
  })
  @MaxLength(AuthenticationValidateParams.PASSWORD_MAX_LENGTH, {
    message: AuthenticationValidateMessages.PASSWORD_MAX_LENGTH,
  })
  public password: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString({ message: AuthenticationValidateMessages.PASSWORD_IS_NOT_STRING })
  @MinLength(AuthenticationValidateParams.PASSWORD_MIN_LENGTH, {
    message: AuthenticationValidateMessages.PASSWORD_MIN_LENGTH,
  })
  @MaxLength(AuthenticationValidateParams.PASSWORD_MAX_LENGTH, {
    message: AuthenticationValidateMessages.PASSWORD_MAX_LENGTH,
  })
  public oldPassword: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString({ message: AuthenticationValidateMessages.PASSWORD_IS_NOT_STRING })
  @MinLength(AuthenticationValidateParams.PASSWORD_MIN_LENGTH, {
    message: AuthenticationValidateMessages.PASSWORD_MIN_LENGTH,
  })
  @MaxLength(AuthenticationValidateParams.PASSWORD_MAX_LENGTH, {
    message: AuthenticationValidateMessages.PASSWORD_MAX_LENGTH,
  })
  public newPassword: string;

  @IsString()
  @IsMongoId()
  public userId: string;
}
