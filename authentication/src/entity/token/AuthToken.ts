import {Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import {User} from "../user/User";
import { CreateDateColumn,UpdateDateColumn } from "typeorm";


@Entity('AuthToken')
export class AuthToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    token: string

    @Column({ type: 'int'})
    userId: number

    @OneToOne(() => User, (user) => user.authToken, {onDelete: "CASCADE"})
    @JoinColumn({ name: "userId" })
    user: User

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

}
