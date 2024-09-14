import { Category } from 'src/context/category/infrastructure/typeorm/category.entitie';
import { User } from 'src/context/user/infrastructure/typeorm/user.entitie';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @OneToMany(() => User, (user) => user.courses)
  author: User;
  @ManyToMany(() => User, (user) => user.mycoursesPayed)
  usersAcquired: User[];
  @ManyToOne(() => Category, (category) => category.courses)
  category: Category;
  reviews: number; // TODO: Luego cambiarlo por la interface de la clase de reviews
  @Column()
  duration: string;
  @Column()
  level: string;
  @Column()
  image_url: string;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
