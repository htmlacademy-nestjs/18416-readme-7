import { IsString, IsMongoId } from 'class-validator';

export class DeleteCommentDto {
  @IsString()
  public id: string;

  @IsString()
  public postId: string;

  @IsString()
  @IsMongoId()
  public userId: string;
}
