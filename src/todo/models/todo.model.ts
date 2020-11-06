import { TodoStatusEnum } from '../enums/todo-status.enum';

export class Todo {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: TodoStatusEnum;
  constructor(
    id = 'uniqueString',
    name = '',
    description = '',
    date = new Date(),
    status = TodoStatusEnum.waiting) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = date;
    this.status = status;
  }
}
