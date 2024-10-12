import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, post => post.likes)
  post: Post;

  @ManyToOne(() => User, user => user.likes)
  user: User;
}
