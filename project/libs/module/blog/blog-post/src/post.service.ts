import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostQuery } from './post.query';
import { PostEntity } from './post.entity';
import { PaginationResult, PostStatus } from '@project/shared/core';
import { CreatePostDto } from './dto/create-post.dto';
import { PostFactory } from './post.factory';
import { postMessages } from './post.constant';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  CommentEntity,
  CommentFactory,
  CommentRepository,
  CreateCommentDto,
  DeleteCommentDto,
} from '@project/comments';
import {
  CreateLikeDto,
  LikeEntity,
  LikeFactory,
  LikeRepository,
} from '@project/blog-like';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository,
    private readonly commentFactory: CommentFactory,
    private readonly likeFactory: LikeFactory,
    private readonly likeRepository: LikeRepository
  ) {}

  public async getAllPosts(
    query?: PostQuery,
    isDraft = false,
    users: string[] = []
  ): Promise<PaginationResult<PostEntity>> {
    return this.postRepository.find(query, isDraft, users);
  }

  public async createPost(dto: CreatePostDto): Promise<PostEntity> {
    const newPost = PostFactory.createFromCreatePostDto(dto);
    await this.postRepository.save(newPost);
    return newPost;
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.postRepository.deleteById(id);
    } catch {
      throw new NotFoundException(postMessages.POST_NOT_FOUND);
    }
  }

  public async deleteComment(dto: DeleteCommentDto): Promise<void> {
    const existsPost = await this.postRepository.findById(dto.postId);
    const existsComment = await this.commentRepository.findById(dto.id);

    if (!existsPost) {
      throw new NotFoundException(postMessages.POST_NOT_FOUND);
    }

    if (!existsComment) {
      throw new NotFoundException(postMessages.COMMENT_NOT_FOUND);
    }

    if (existsComment.userId !== dto.userId) {
      throw new ForbiddenException(postMessages.USER_IS_NOT_AUTHOR);
    }

    existsPost.commentsCount -= 1;

    await this.commentRepository.deleteById(dto.id);
  }

  public async getPost(id: string): Promise<PostEntity> {
    try {
      return this.postRepository.findById(id);
    } catch {
      throw new NotFoundException(postMessages.POST_NOT_FOUND);
    }
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<PostEntity> {
    const existsPost = await this.postRepository.findById(id);
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return existsPost;
    }

    await this.postRepository.update(existsPost);

    return existsPost;
  }

  public async addComment(
    postId: string,
    dto: CreateCommentDto
  ): Promise<CommentEntity> {
    const existsPost = await this.postRepository.findById(postId);

    if (!existsPost) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    existsPost.commentsCount += 1;

    const newComment = this.commentFactory.createFromDto(dto, existsPost.id);
    await this.commentRepository.save(newComment);

    return newComment;
  }

  public async getComments(
    postId: string
  ): Promise<PaginationResult<CommentEntity>> {
    const existingPost = await this.postRepository.findById(postId);
    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    return this.commentRepository.findByPostId(existingPost.id);
  }

  public async makeRepost(postId: string, userId: string): Promise<PostEntity> {
    const existingPost = await this.getPost(postId);

    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    if (existingPost.userId === userId) {
      throw new ForbiddenException(postMessages.USER_IS_ALREADY_AUTHOR);
    }

    if (existingPost.publicationStatus === PostStatus.DRAFT) {
      throw new ForbiddenException(postMessages.CANNOT_REPOST_DRAFT);
    }

    const { entities } = await this.getAllPosts({ userId } as PostQuery);
    for (const entity of entities) {
      if (
        entity.isPublicationReposted &&
        entity.originalPublicationId === existingPost.id
      ) {
        throw new ForbiddenException(postMessages.POST_ALREADY_REPOSTED);
      }
    }

    return await this.postRepository.repost(existingPost, userId);
  }

  public async addLike(
    postId: string,
    dto: CreateLikeDto
  ): Promise<LikeEntity> {
    const existsPost = await this.getPost(postId);
    if (!existsPost) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    if (existsPost.publicationStatus !== PostStatus.PUBLISHED) {
      throw new ForbiddenException(postMessages.LIKES_ONLY_FOR_PUBLISHED_POSTS);
    }

    const newLike = this.likeFactory.createFromDto(dto, existsPost.id);
    await this.likeRepository.save(newLike);

    // Апдейтим likesCount
    existsPost.likesCount += 1;
    await this.postRepository.update(existsPost);

    return newLike;
  }

  public async deleteLike(postId: string, dto: CreateLikeDto): Promise<void> {
    const existsPost = await this.getPost(postId);
    await this.likeRepository.delete(existsPost.id, dto.userId);

    // Апдейтим likesCount
    existsPost.likesCount -= 1;
    await this.postRepository.update(existsPost);
  }

  // Подсчитываем список постов для пользователя
  public async getCount(id: string) {
    return await this.postRepository.getPostsCountForUser(id);
  }
}
