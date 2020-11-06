import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Todo } from './models/todo.model';
import { Request } from 'express';

@Controller('todo')
export class TodoController {
  private todos = [];
  constructor() {
    this.todos = [
      new Todo('uniqueId1','Lundi', 'Entamer la semaine'),
    ]
  }

  @Get(':id')
  getTodos(
    @Param('id') id,
    @Query() query,
    @Body() body
  ) {
    console.log('id : ', id);
    console.log('queries : ', query);
    console.log('Body : ', body);
    return this.todos;
  }

}
