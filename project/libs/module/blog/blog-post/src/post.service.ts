import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostQuery } from './post.query';
import { PostEntity } from './post.entity';
import { PaginationResult } from '@project/shared/core';
import { CreatePostDto } from './dto/create-post.dto';
import { PostFactory } from './post.factory';
import { postMessages } from './post.constant';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async getAllPosts(
    query?: PostQuery
  ): Promise<PaginationResult<PostEntity>> {
    return this.postRepository.find(query);
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
}
