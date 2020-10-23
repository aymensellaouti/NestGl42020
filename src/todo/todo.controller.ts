import { Controller, Get } from '@nestjs/common';
import { Todo } from './models/todo.model';

@Controller('todo')
export class TodoController {
  private todos = [];
  constructor() {
    this.todos = [
      new Todo(1,'Lundi', 'Entamer la semaine'),
    ]
  }

  @Get('')
  getTodos() {
    return this.todos;
  }

}
