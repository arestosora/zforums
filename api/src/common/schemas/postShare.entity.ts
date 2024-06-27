import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class PostShare {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.sharedPosts)
  user: User;

  @ManyToOne(() => Post, post => post.shares)
  post: Post;

  @CreateDateColumn()
  sharedAt: Date;
}
