import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = '';

  @Column({ unique: true })
  username: string = '';

  @Column()
  password!: string;

  @Column({ type: "text", nullable: true })
  refreshToken: string | null = null;
}
