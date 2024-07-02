import { Controller, Get, Post as HttpPost, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { User } from 'src/common/schemas/user.entity';

@Auth(Role.USER)
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @HttpPost()
  async create(@Body() createCommentDto: CreateCommentDto, @ActiveUser() user: User) {
    try {
      const comment = await this.commentService.create(createCommentDto, user);
      return comment;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const comments = await this.commentService.findAll();
      return comments;
    } catch (error) {
      throw new HttpException('Failed to get comments', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const comment = await this.commentService.findOne(id);
      return comment;
    } catch (error) {
      throw new HttpException(`Comment not found: ${error.message}`, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto, @ActiveUser() user: User) {
    try {
      const updatedComment = await this.commentService.update(id, updateCommentDto, user);
      return updatedComment;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @ActiveUser() user: any) {
    try {
      await this.commentService.remove(id, user);
      return { statusCode: HttpStatus.OK, message: 'Comment deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
