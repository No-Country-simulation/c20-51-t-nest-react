import { Course } from 'src/context/course/infrastructure/typeorm/entities/course.entittie';
import { User } from 'src/context/user/infrastructure/typeorm/user.entitie';
import { PaymentStatus } from 'src/utils/enum/payments.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => User, (user) => user.payments)
  user: User;
  @ManyToMany(() => Course)
  @JoinTable()
  course: Course[];
  @Column({ default: PaymentStatus.PENDING })
  status: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
