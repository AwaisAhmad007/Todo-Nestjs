import { Injectable } from "@nestjs/common";
import { Todo } from "./data/todo.dto";
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from "@nestjs/typeorm";
import { Tasks } from "./data/task.entity";
import {Users} from "./data/user.entity";
import {Position} from "./data/position.entity"

import { Repository } from "typeorm";


@Injectable()
export class TodoService{
    public todos : Todo[] = [];
    positionsRepository: any;

    constructor(
        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Position)
        private positionRepository: Repository<Position>,
      ) {}

      
    //add todo
addTodoService( todo : Todo) : string{
    todo.id = uuidv4();
    this.todos.push(todo);
    return "This todo is successfully added"
}



    //update todo
updateTodoService(todo : Todo) : string{

    //validate if the todo id exist in the body
    if(!todo.id) return 'Please provide the id to update the todo' 

    let index = this.todos.findIndex((currenttodo)=>{
        return currenttodo.id == todo.id;
    })
   
    //check if the todo exist
    if(index===-1){
        return 'Todo Not found';
    }   
    
    this.todos[index] = todo;
    return 'This todo is successfully added'
}

    //delete todo
    deleteTodoService(todoId : string) : string{
        this.todos = this.todos.filter((todo)=>{
            return todo.id != todoId;
        })
        return "Todo has been deleted"
    }
    //findall todo
    async findAllTodoService() : Promise<Todo[]>{

        const tasks = await this.tasksRepository.find();
        const users = await this.usersRepository.find();
        const position = await this.positionRepository.find();

        console.log('all users',users);
        console.log('all tasks',tasks);
        console.log('all positions',position);

        const todos: Todo[] = [];
        tasks.forEach((task, index) => {
            // console.log(`task: ${index}`,task);
            const user = users.find(el => el.id?.toString() === task.User_Id?.toString());

            console.log("User I_d",user);

            todos.push({
                Title: task.Title,
                id: task.Id?.toString(),

                User:user.U_Name?.toString(),
                Narration: task.Narration,
                StartDate: task.Created_Date?.toString(),
                EndDate: task.End_Date?.toString(),
                status: 'true'

            })
        })
        return todos;
    }



    

    //get todo by Id
    findTodoById(id : string): Todo|string{
        const todo = this.todos.find(t=> t.id ===id);
        
        if(!todo){
            return 'Todo Not found';
        }
        return todo;
    }

    
   // get todo by author
   findTodoByAuthor(author : string): Todo|string{
    const todo = this.todos.find(t=> t.Author ===author);
    
    if(!todo){
        return 'Todo Not found';
    }
    return todo;
}

}