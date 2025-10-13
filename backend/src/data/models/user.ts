import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  @Index()
  email!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @Column({ nullable: true })
  pin!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
