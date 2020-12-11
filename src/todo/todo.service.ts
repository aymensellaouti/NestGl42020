import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './models/todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  constructor() {
    const todo = new Todo();
    todo.name = 'Sport';
    todo.description = 'Faire du Sport';
    this.todos = [
      todo
    ];
  }
  private findTodoById(id: string): Todo {
    const todo = this.todos.find(
      (actualTodo) => {
        if (actualTodo.id === id)
          return actualTodo;
      }
    );
    if (todo)
      return todo;
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(id: string) {
    return this.findTodoById(id);
  }

  addTodo(newTodo: CreateTodoDto): Todo {
    const {name, description} = newTodo;
    const todo =  new Todo();
    todo.name = name;
    todo.description = description;

    this.todos.push(todo);
    return todo;
  }

  deleteTodo(id: string): Todo[] {
    const todo = this.findTodoById(id);

    this.todos.splice(this.todos.indexOf(todo), 1);
    return this.todos;
  }

  updateTodo(id: string, newTodo: UpdateTodoDto) {
    const {name, description, status} = newTodo;
    const todo = this.findTodoById(id);
    todo.name = name? name : todo.name;
    todo.description = description? description : todo.description;
    todo.status = status? status : todo.status ;

    return todo;
  }
}
