import { Role } from 'src/utils/enum/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  name: string;
  @Column()
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
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}
