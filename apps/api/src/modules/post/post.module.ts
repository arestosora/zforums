import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/common/schemas/post.entity';
import { PostShare } from 'src/common/schemas/postShare.entity';
import { JwtService } from '@nestjs/jwt';
import { Like } from 'src/common/schemas/like.entity'; // Import the Like entity

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostShare, Like])],
  providers: [PostService, JwtService],
  controllers: [PostController],
  exports: [TypeOrmModule]
})
export class PostModule {}
