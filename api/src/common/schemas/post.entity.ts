import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { PostShare } from './postShare.entity';


@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  likes: number;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @OneToMany(() => PostShare, postShare => postShare.post)
  shares: PostShare[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
