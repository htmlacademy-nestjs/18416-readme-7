import { IsDate, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateLikeDto {
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
  @IsMongoId()
  public userId: string;
}
