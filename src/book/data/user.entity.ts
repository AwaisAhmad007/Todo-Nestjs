import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tasks } from "./task.entity";




@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    U_Name:string

    
    @OneToMany(() => Tasks, (Tasks) => Tasks.user)
    task: Tasks[];
}

 