import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';
import { FirstPipe } from '../pipes/first.pipe';
import { TodoEntity } from './entities/todo.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserEntity } from '../auth/entities/user.entity';



@Controller('todo')
export class TodoController {
  constructor(
    private todoService: TodoService
  ) {}


  @Get('')
  getTodos(
  ): Promise<TodoEntity[]> {
    return this.todoService.findAllTodos();
  }

  @Get(':id')
  getTodoById(
    @Param('id') id: number
  ) {
    return this.todoService.findTodoById(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('restore/:id')
  restoreTodoById(
    @Param('id') id: number
  ) {
    return this.todoService.restoreTodo(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addTodo(
    @Body(FirstPipe) newTodo: CreateTodoDto,
    @Req() request: Request
  ): Promise<TodoEntity> {
    const user = request.user;
    return await this.todoService.addTodo(newTodo, user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteTodo(
    @Param('id') id: number
  ) {
    return this.todoService.deleteTodo(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateTodo(
    @Body() newTodo: UpdateTodoDto,
    @Param('id') id: string
  ): Promise<TodoEntity> {
    return this.todoService.updateTodo(id, newTodo);
  }

}
