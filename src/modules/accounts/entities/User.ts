import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    driver_license: string;

    @Column({ default: false })
    isAdmin: boolean;

    @Column({ nullable: true })
    avatar: string;

    @CreateDateColumn()
    created_at: Date;
}

export { User };