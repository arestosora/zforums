import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':id')
  async create(@Param('id') id: string, @Body('userId') userId: number): Promise<void> {
    await this.likeService.create(parseInt(id), userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Body('userId') userId: number): Promise<void> {
    await this.likeService.unlike(parseInt(id), userId);
  }
}


