import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from 'src/common/schemas/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async create(postId: number, userId: number) {
    const like = this.likeRepository.create({ post: { id: postId }, user: { id: userId } });
    return await this.likeRepository.save(like);
  }

  async unlike(postId: number, userId: number) {
    const like = await this.likeRepository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (like) {
      await this.likeRepository.remove(like);
    }
  }
}
