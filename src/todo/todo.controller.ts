import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';
import { FirstPipe } from '../pipes/first.pipe';



@Controller('todo')
export class TodoController {
  constructor(
    private todoService: TodoService
  ) {}


  @Get('')
  getTodos() {
    return this.todoService.getTodos();
  }

  @Get(':id')
  getTodoById(
    @Param('id') id: string
  ) {
    return this.todoService.getTodoById(id);
  }

  @Post()
  addTodo(
    @Body(FirstPipe) newTodo: CreateTodoDto
  ) {
    console.log(typeof newTodo);
    return this.todoService.addTodo(newTodo);
  }

  @Delete(':id')
  deleteTodo(
    @Param('id') id: string
  ) {
    return this.todoService.deleteTodo(id);
  }

  @Put(':id')
  updateTodo(
    @Body() newTodo: UpdateTodoDto,
    @Param('id') id: string
  ) {
    return this.todoService.updateTodo(id, newTodo);
  }

}
