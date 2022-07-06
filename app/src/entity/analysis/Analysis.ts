
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/User";
import {IsNotEmpty, Length} from "class-validator";

@Entity('Analysis')
export class Analysis {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(2, 100)
    @IsNotEmpty()
    title: string;

    @Column()
    @Length(2, 500)
    // @IsNotEmpty()
    description: string;

    @Column()
    @IsNotEmpty()
    group: string;

    @Column()
    @IsNotEmpty()
    result:string;

    @Column()
    @IsNotEmpty()
    severity: string;

    @ManyToOne(() => User, (user) => user.analysis, {onDelete: "CASCADE"})
    user: User;

}
