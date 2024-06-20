import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {Users} from "./data/user.entity";
import { Tasks } from "./data/task.entity";
import { usertask } from "./data/UserTask.entity";
import { Position } from "./data/position.entity";

@Module({
    imports : [TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Tasks]),
    TypeOrmModule.forFeature([usertask]),
    TypeOrmModule.forFeature([Position])],
    
    controllers : [TodoController],
    providers : [TodoService],

})
export class TodoModule{

}
