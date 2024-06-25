import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  postId: number;
}

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
