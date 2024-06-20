import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class usertask{

    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    User_ID:number;

    @Column()
    Task_Id:number;
}