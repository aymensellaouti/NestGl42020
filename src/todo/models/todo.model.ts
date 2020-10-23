import { TodoStatusEnum } from '../enums/todo-status.enum';

export class Todo {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  status: TodoStatusEnum;
  constructor(
    id = 0,
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
