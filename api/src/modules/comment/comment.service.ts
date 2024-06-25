import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/common/schemas/comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { User } from 'src/common/schemas/user.entity';
import { Post } from 'src/common/schemas/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: User): Promise<Comment> {
    const post = await this.postRepository.findOne({ where: { id: createCommentDto.postId } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${createCommentDto.postId} not found`);
    }
  
    const comment = this.commentRepository.create({ ...createCommentDto, author: user, post });
    try {
      return await this.commentRepository.save(comment);
    } catch (error) {
      console.error('Error saving comment:', error);
      throw new InternalServerErrorException('Failed to create comment');
    }
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['author', 'post'] });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['author', 'post'] });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, user: User): Promise<Comment> {
    const comment = await this.findOne(id);
    if (comment.author.id !== user.id) {
      throw new NotFoundException('You are not the author of this comment');
    }
    this.commentRepository.merge(comment, updateCommentDto);
    return this.commentRepository.save(comment);
  }

  async remove(id: number, user: User): Promise<void> {
    const comment = await this.findOne(id);
    if (comment.author.id !== user.id) {
      throw new NotFoundException('You are not the author of this comment');
    }
    await this.commentRepository.remove(comment);
  }
}
