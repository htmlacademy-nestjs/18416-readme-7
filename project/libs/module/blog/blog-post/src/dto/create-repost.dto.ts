import { IsMongoId } from 'class-validator';

export class CreateRepostDto {
  @IsMongoId()
  public userId: string;
}
