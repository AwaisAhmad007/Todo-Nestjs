import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id:string

    @Column()
    U_Name:string

    @Column({ default: true })
    State: boolean;
}

 