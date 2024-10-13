import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { LikeService } from './like.service';
import { Like } from 'src/common/schemas/like.entity';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':id')
  async create(@Param('id') id: number, @Body('userId') userId: number): Promise<void> {
    await this.likeService.create(id, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Body('userId') userId: number): Promise<void> {
    await this.likeService.unlike(parseInt(id), userId);
  }

  @Get(':postId')
  async getLikesForPost(@Param('postId') postId: number): Promise<Like[]> {
    return this.likeService.getLikes(postId);
  }
}


