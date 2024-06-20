import { Body, Controller, Get, Put, Delete, Post, Param, NotFoundException } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Todo } from "./data/todo.dto";

@Controller("todo")
export class TodoController{

    constructor(private TodoService  : TodoService){}

    
    @Put("/update")
    updateTodo(@Body() todo : Todo ) : string{
        return this.TodoService.updateTodoService(todo);
    }
    
    @Delete("/delete/:id")
    deleteTodo(@Param('id') todoId : string) : string{
        return this.TodoService.deleteTodoService(todoId);
    }
    
    @Post('/add')
    addTodo(@Body() todo:Todo) : string{
        return this.TodoService.addTodoService(todo);
    }

    @Get("/findAll")
    async getAllTodos() : Promise<Todo[]>{
        const todos = await this.TodoService.findAllTodoService();
        return todos;
    }
  
    @Get("/getone/:id")
    getTodoById(@Param('id')id:string){
        
    let todo = this.TodoService.findTodoById(id);

    return todo;

    }



    @Get("/getauthor/:author")
    getTodoByAuthor(@Param('author')author:string){
     
    let todo = this.TodoService.findTodoByAuthor(author);

    return todo;

    }

}

