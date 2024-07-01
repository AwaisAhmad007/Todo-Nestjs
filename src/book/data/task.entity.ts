import {Column, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn} from "typeorm";
import { Users } from "./user.entity";


@Entity()
export class Tasks{

@PrimaryGeneratedColumn()
Id:string;

@Column()
Title:string;

@Column()
Narration:string;

@Column()
Created_Date:Date;

@Column()
End_Date:Date;

@Column()
State: Boolean;

@Column({ name : 'User_Id'})
User_Id:number;

@ManyToOne(() => Users, (Users) => Users.task)
@JoinColumn ({name : 'User_Id'})
user: Users

}