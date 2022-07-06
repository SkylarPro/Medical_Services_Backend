
import {Column, Entity, OneToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AuthToken} from "../token/AuthToken";

@Entity('User_auth')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => AuthToken, (token) => token.userId, {onDelete: "CASCADE"})
    authToken: AuthToken
}
