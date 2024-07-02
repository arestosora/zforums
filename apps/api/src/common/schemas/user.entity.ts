import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn, CreateDateColumn } from 'typeorm';
import { Role } from '../enums/rol.enum';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { PostShare } from './postShare.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  banner: string;

  @Column({ nullable: true  })
  bio: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

  @OneToMany(() => PostShare, postShare => postShare.user)
  sharedPosts: PostShare[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}