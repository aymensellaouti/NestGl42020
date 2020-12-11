import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';
import { FirstPipe } from '../pipes/first.pipe';
import { TodoEntity } from './entities/todo.entity';



@Controller('todo')
export class TodoController {
  constructor(
    private todoService: TodoService
  ) {}


  @Get('')
  getTodos(): Promise<TodoEntity[]> {
    return this.todoService.findAllTodos();
  }

  @Get(':id')
  getTodoById(
    @Param('id') id: number
  ) {
    return this.todoService.findTodoById(id);
  }

  @Get('restore/:id')
  restoreTodoById(
    @Param('id') id: number
  ) {
    return this.todoService.restoreTodo(id);
  }

  @Post()
  async addTodo(
    @Body(FirstPipe) newTodo: CreateTodoDto
  ): Promise<TodoEntity> {
    return await this.todoService.addTodo(newTodo);
  }

  @Delete(':id')
  deleteTodo(
    @Param('id') id: number
  ) {
    return this.todoService.deleteTodo(id);
  }

  @Put(':id')
  updateTodo(
    @Body() newTodo: UpdateTodoDto,
    @Param('id') id: string
  ): Promise<TodoEntity> {
    return this.todoService.updateTodo(id, newTodo);
  }

}
