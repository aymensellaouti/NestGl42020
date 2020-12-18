import { TodoStatusEnum } from '../enums/todo-status.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Timestamp } from '../../generics/timestamp';
import { UserEntity } from '../../auth/entities/user.entity';

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

  @ManyToOne(
    type => UserEntity,
    (user) => user.todos,
    {
      cascade: ['insert', 'update'],
      nullable: true,
      eager: true
    }
  )
  user: UserEntity;
}
