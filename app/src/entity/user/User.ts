
import {Column, Entity, OneToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { Analysis} from "../analysis/Analysis";
import * as bcrypt from "bcryptjs";

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsNotEmpty()
    email: string;

    @Column({ unique: true })
    @IsNotEmpty()
    nickname: string;

    @Column()
    @Length(6,20)
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    firstname: string;

    @Column()
    @IsNotEmpty()
    surname: string;

    @Column()
    sex: string;

    @Column()
    age: number;

    @OneToMany(() => Analysis, analysis => analysis.user, {onDelete: "CASCADE"})
    analysis: Analysis[];

    public hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

}
