import { Body, Controller, Get, Put, Delete, Post, Param, NotFoundException, UseGuards } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Todo } from "./data/todo.dto";

@Controller("todo")

export class TodoController{

    constructor(private TodoService  : TodoService){}

    
    @Put('/update')
    updateTodo(@Param('id') id: string, @Body() todo: Todo) {
      return this.TodoService.updateTodoService(+id, todo);
    }
    
    @Delete("/delete/:id")
    deleteTodo(@Param('id') id: string) {
      return this.TodoService.deleteTodoService(+id);
    }
    
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
  
    @Get('/getone/:id')
    async gettodobyid(@Param('id') id: number) {
      return this.TodoService.findbyid(id);
    }
  
    //get one Task
    @Get('/gettask/:Id')
    async getonetask(@Param('Id') Id:number){
      return this.TodoService.findonetask(Id)
    }

    //get todo by username

    @Get('/getuser/:User')
    async gettodobyUser(@Param('User') User: string) {
      return this.TodoService.findbyUser(User);
    }

}

