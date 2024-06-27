import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/common/schemas/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { User } from 'src/common/schemas/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const post = this.postRepository.create({ ...createPostDto, author: user });
    try {
      return await this.postRepository.save(post);
    } catch (error) {
      console.error('Error saving post:', error);
      throw new InternalServerErrorException('Failed to create post');
    }
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['author', 'comments'],
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'comments'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    this.postRepository.merge(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.postRepository.softRemove(post);
  }

  async likePost(postId: number): Promise<Post> {
    const post = await this.findOne(postId);
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    post.likes = (post.likes || 0) + 1;

    try {
      return await this.postRepository.save(post);
    } catch (error) {
      console.error('Error liking post:', error);
      throw new InternalServerErrorException('Failed to like post');
    }
  }
  
}
