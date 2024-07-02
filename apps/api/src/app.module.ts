import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { EnvironmentModule } from './modules/config/environment.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/database/database.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    EnvironmentModule,
    UsersModule,
    AuthModule,
    DatabaseModule,
    PostModule,
    CommentModule,
  ],
})

export class AppModule { }
