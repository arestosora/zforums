import {
  Controller,
  Get,
  Post as HttpPost,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { User } from 'src/common/schemas/user.entity';
import { Role } from 'src/common/enums/rol.enum';

@Auth(Role.USER)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpPost()
  async create(@Body() createPostDto: CreatePostDto, @ActiveUser() user: User) {
    try {
      if (!user.id) {
        throw new HttpException('User ID is missing', HttpStatus.BAD_REQUEST);
      }
      console.log('Creating post for user:', user);
      const post = await this.postService.create(createPostDto, user);
      return post;
    } catch (error) {
      console.error('Error creating post:', error);
      throw new HttpException('Failed to create post', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const posts = await this.postService.findAll();
      return posts;
    } catch (error) {
      throw new HttpException('Failed to get posts', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const post = await this.postService.findOne(id);
      return post;
    } catch (error) {
      throw new HttpException(`Post not found: ${error.message}`, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @ActiveUser() user: User) {
    try {
      const post = await this.postService.findOne(id);
      if (post.author.id !== user.id) {
        throw new HttpException('You are not the author of this post', HttpStatus.FORBIDDEN);
      }
      const updatedPost = await this.postService.update(id, updatePostDto);
      return updatedPost;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @ActiveUser() user: User) {
    try {
      const post = await this.postService.findOne(id);
      if (post.author.id !== user.id) {
        throw new HttpException('You are not the author of this post', HttpStatus.FORBIDDEN);
      }
      await this.postService.remove(id);
      return { statusCode: HttpStatus.OK, message: 'Post deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id/like')
  async likePost(@Param('id') id: number) {
    try {
      const post = await this.postService.likePost(id);
      return post;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('shared-by-user/:userId')
  async getSharedPostsByUser(@Param('userId') userId: number) {
    try {
      const posts = await this.postService.getSharedPostsByUser(userId);
      return posts;
    } catch (error) {
      throw new HttpException(`Failed to get shared posts: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @HttpPost(':id/share')
  async sharePost(@Param('id') postId: number, @ActiveUser() user: User) {
    try {
      if (!user.id) {
        throw new HttpException('User ID is missing', HttpStatus.BAD_REQUEST);
      }
      const postShare = await this.postService.sharePost(postId, user);
      return postShare;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
