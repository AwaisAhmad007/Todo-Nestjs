import { Body, Controller, Get, Put, Delete, Post, Param, NotFoundException, UseGuards } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Todo } from "./data/todo.dto";
import { Tasks } from "./data/task.entity";
import { Users } from "./data/user.entity";
// import { State } from "./data/state.entity";

@Controller("todo")


export class TodoController{

    constructor(private TodoService  : TodoService){}

    
    @Put('/update')
    updateTodo(@Param('id') id: string, @Body() todo: Todo) {
      return this.TodoService.updateTodoService(+id, todo);
    }
  

    // @Put("/update")
    
    // updateTodo(@Body() todo : Todo ) : string{
    //     return this.TodoService.updateTodoService(todo);
    // }
    
    @Delete("/delete/:id")
    deleteTodo(@Param('id') id: string) {
      return this.TodoService.deleteTodoService(+id);
    }

    // @Delete("/delete/:id")
    // deleteTodo(@Param('id') todoId : string) : string{
    //     return this.TodoService.deleteTodoService(todoId);
    // }
    
    @Post('/add')
    addTodo(@Body() todo:Todo) {
        return this.TodoService.addTodoService(todo);
    }
    // findall todos
    @Get("/findAll")
    async getAllTodos() : Promise<Todo[]>{
        const todos = await this.TodoService.findAllTodoService();
        return todos;
    }

    //find completed tasks
    @Get("/completedtasks")
    async completedtodos() {
        const todos = await this.TodoService.completedtasks();
        return todos;
    }

    // @Get("/getone/:id")
    // getTodoById(@Param('id')id:string){   
    //    let todo = this.TodoService.findTodoById(id);
    //    return todo;
    // }

    // @Get("/getone/:id")
    // getTodoById(id: string): Promise<Tasks>{   
    //    let todo = this.TodoService.findTodoById(id);
    //    return todo;
    // }
    @Get('/getone/:id')
    async gettodobyid(@Param('id') id: number) {
      return this.TodoService.findbyid(id);
    }

    //get todo by username

    @Get('/getuser/:User')
    async gettodobyUser(@Param('User') User: string) {
      return this.TodoService.findbyUser(User);
    }

    // @Get("/getauthor/:user")
    // getTodoByAuthor(@Param('author')author:string){
    // let todo = this.TodoService.findTodoByAuthor(author);
    // return todo;
    // }

}

