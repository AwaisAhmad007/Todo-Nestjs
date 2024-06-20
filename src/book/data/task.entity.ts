import {Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";



@Entity()
export class Tasks{

@PrimaryGeneratedColumn()
Id:number;

@Column()
Title:string;

@Column()
Narration:string;

@Column({
    nullable: true,

})
Created_Date!:Date;

@Column({

 nullable:true,
})
End_Date!:Date;

@Column()
User_Id:number;

@Column()
Task_Id:number;

}