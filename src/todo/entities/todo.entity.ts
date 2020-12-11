import { TodoStatusEnum } from '../enums/todo-status.enum';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Timestamp } from '../../generics/timestamp';

@Entity('todo')
export class TodoEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
  })
  name: string;

  @Column({
    length: 255
  })
  description: string;

  @Column({
      type: 'enum',
      enum: TodoStatusEnum,
      default: TodoStatusEnum.waiting
    }
  )
  status: TodoStatusEnum;

}
