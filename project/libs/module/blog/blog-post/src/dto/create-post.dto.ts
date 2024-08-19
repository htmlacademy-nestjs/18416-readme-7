import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared/enums';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post type',
    enum: PostType,
    example: PostType.VIDEO,
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  public type: PostType;

  @ApiProperty({
    description: 'Post user ID',
    example: 'sad323234sdffsd234234',
  })
  @IsNotEmpty()
  @IsString()
  public userId: string;

  @IsNotEmpty()
  @IsString()
  public postTitle: string;

  @ApiProperty({
    description: 'Post tags',
    isArray: true,
    example: ['#ad', '#asdsad'],
  })
  @IsOptional()
  @IsArray()
  public tags?: string[];

  @ApiProperty({
    description: 'Post likes',
    isArray: true,
    example: ['#ad', '#asdsad'],
  })
  @IsOptional()
  @IsArray()
  public likes?: string[];

  @IsOptional()
  @IsArray()
  public comments?: string[];

  @IsOptional()
  @IsString()
  public originalPublicationId?: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  public originalUserId?: string;

  @IsOptional()
  @IsBoolean()
  public isPublicationReposted?: boolean;

  @IsOptional()
  @IsString()
  public videoLink?: string;

  @IsOptional()
  @IsISO8601()
  public publishedAt?: Date;

  @IsOptional()
  @IsString()
  public publicationStatus?: string;

  @IsOptional()
  @IsNumber()
  public publicationRepostNumber?: number;

  @IsOptional()
  @IsString()
  public postAnons?: string;

  @IsOptional()
  @IsString()
  public postText?: string;

  @IsOptional()
  @IsString()
  public quoteText?: string;

  @IsOptional()
  @IsString()
  public quoteAuthor?: string;

  @IsOptional()
  @IsString()
  public photo?: string;

  @IsOptional()
  @IsString()
  public linkDescription?: string;

  @IsOptional()
  @IsString()
  public linkUrl?: string;
}
