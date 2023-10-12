import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', comment: '姓名', default: null })
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  // @OneToMany(() => Post, (post) => post.user)
  // post: Post[];
}
