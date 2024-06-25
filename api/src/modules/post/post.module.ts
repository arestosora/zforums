import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/common/schemas/post.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService, JwtService],
  controllers: [PostController],
  exports: [TypeOrmModule] 
})
export class PostModule {}