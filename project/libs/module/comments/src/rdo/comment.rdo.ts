import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/*
model Comment {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  Post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade, onUpdate: Cascade)
  postId    String   @map("post_id")
  text      String
  createdAt DateTime @default(now()) @map("created_at")

  @@map("comments")
}
*/

export class CommentRdo {
  @ApiProperty({
    description: 'user id',
    example: '661c4efd846b53843bbbb31d',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'comment text',
    example: 'Some text!',
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'postId',
    example: 'asdasd3-asasdds-asdasdasd-23434',
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'created at',
    example: '2024-07-29T04:24:56.124Z',
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'updated at',
    example: '2024-07-29T04:24:56.124Z',
  })
  @Expose()
  public updatedAt: string;
}
