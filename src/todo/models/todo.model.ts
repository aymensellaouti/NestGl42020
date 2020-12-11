import { TodoStatusEnum } from '../enums/todo-status.enum';
import { v4 as uuidv4 } from 'uuid';
export class Todo {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: TodoStatusEnum;
  constructor(
    id = uuidv4(),
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
