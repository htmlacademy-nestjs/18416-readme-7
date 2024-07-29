import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CommentValidationMessages } from '../comment.constant';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public postId: string;

  @IsDate()
  @IsNotEmpty()
  public createdAt: Date;

  @IsString()
  @IsNotEmpty({ message: CommentValidationMessages.MessageEmpty })
  public text: string;

  @IsString()
  @IsUUID(undefined, { message: CommentValidationMessages.IDInvalid })
  public userId: string;
}
