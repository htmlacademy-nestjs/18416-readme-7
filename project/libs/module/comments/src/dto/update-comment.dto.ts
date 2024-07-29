import { IsNotEmpty, IsString, IsUUID, IsDate } from 'class-validator';
import { CommentValidationMessages } from '../comment.constant';

export class UpdateCommentDto {
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public postId: string;

  @IsDate()
  @IsNotEmpty()
  public createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  public updatedAt: Date;

  @IsString()
  @IsNotEmpty({ message: CommentValidationMessages.MessageEmpty })
  public text: string;

  @IsString()
  @IsUUID(undefined, { message: CommentValidationMessages.IDInvalid })
  public userId: string;
}
