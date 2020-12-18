import { Timestamp } from '../../generics/timestamp';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TodoEntity } from '../../todo/entities/todo.entity';

export enum UserRoleEnum {
  ADMIN = 'admin',
  USER = 'user'
}

@Entity('user')
export class UserEntity extends Timestamp {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true
  })
  username: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER
  })
  role: string;

  @OneToMany(
    type => TodoEntity,
    (cv) => cv.user,
    {
      nullable: true,
      cascade: true
    }
  )
  todos: TodoEntity[];

}

