import { Course } from 'src/context/course/infrastructure/typeorm/entities/course.entittie';
import { Payment } from 'src/context/payment/infrastructure/typeorm/entitie/payment.entitie';
import { Role } from 'src/utils/enum/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ nullable: true })
  password: string;
  @Column({ default: Role.USER })
  role: string;
  @Column({
    default:
      'https://res.cloudinary.com/dkent00db/image/upload/v1717555619/image%20profile%20picture%20placeholder/vqnmnefzjwscrtkfpxtw.webp',
  })
  image_url: string;
  @Column({ nullable: true })
  phone?: number;
  @Column({ nullable: true })
  birthdate?: string;
  @Column({ nullable: true })
  country?: string;
  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];
  @ManyToOne(() => Course, (course) => course.author)
  courses: Course[];
  @ManyToMany(() => Course)
  @JoinTable()
  mycoursesPayed: Course[];
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}
