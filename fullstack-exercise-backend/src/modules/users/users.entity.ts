import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @Column()
  username!: string;

  @Column()
  password!: string;

  @PrimaryGeneratedColumn()
  id!: number;
}
