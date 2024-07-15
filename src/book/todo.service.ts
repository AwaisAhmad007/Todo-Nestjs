import { Injectable } from "@nestjs/common";
import { Todo } from "./data/todo.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Tasks } from "./data/task.entity";
import {Users} from "./data/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class TodoService{
    public todos : Todo[] = [];
  
    constructor(
        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
      ) {}

    //add todo
    async  addTodoService(todo: Todo){
        const user = await this.usersRepository.findOneBy({id: todo.User_Id});
        if(!user)
            return {message: 'User not found',status: 404}
        const add = this.tasksRepository.create(todo);
 
        return await this.tasksRepository.save(add);
    }

// findOne(options: FindOneOptions<Entity>): Promise<Entity | null>;

    async updateTodoService(taskId: number, todo: Todo) {
        const toUpdate = await this.tasksRepository.findOneBy({Id: todo.id});
    //
        if(!toUpdate) return {message: 'Task does not exist', status:404}
        const updated = Object.assign(toUpdate, todo);

    // console.log("Updated todo", updated)
        return await this.tasksRepository.save(updated);
  }

    //delete todo

    async deleteTodoService(id: number) {
        const deleted = await this.tasksRepository.delete(id);
        if(deleted?.affected !== 0){
            return {
                data:{
                    message:'Deleted Successfully!'
                }
            }
        }else{
            return {
                error:{
                    message:'No record found.'
                }
            }
        }
      }
   
    //Find all todos
    async findAllTodoService() : Promise<Todo[]> {
        const tasks = await this.tasksRepository.find({
            relations:{
                user:true,
            }
        })
        // console.log('all users',tasks);
        return tasks.map(task =>  {          
            return {          
                id : task.Id,
                User: task?.user?.U_Name,
                Title: task.Title,
                Narration: task.Narration,
                StartDate: task.Created_Date,
                EndDate: task.End_Date,
                User_Id: task.User_Id,
                State  : task.State,
            }      
        });  
    }
     
    async completedtasks()  {
        const tasks = await this.tasksRepository.find({
            relations:{
                user:true,
            },
            where: {
                State: true,
            } 
        })
        // console.log(tasks);
        return tasks;
    }

    // get todo by id

    async findbyid(id: number){
        const tasks = await this.tasksRepository.find({
            relations:{
                user:true,
            },
            where:{
            User_Id:id
        },
    })
     return tasks;
}


    //get one task by taskid
    async findonetask(Id: number){
        const tasks = await this.tasksRepository.findOne({
            relations:{
                user:true,
            },
            where:{
            Id:Id
        },
    })
     return tasks;
}
    
   // get todo by author
   async findbyUser(user: string){
    const users = await this.usersRepository.find({
        relations:{
            task:true,
        },
        where:{
        U_Name:user
    },
  })
     return users
 }
}