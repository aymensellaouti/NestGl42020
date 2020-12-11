import { TodoStatusEnum } from '../enums/todo-status.enum';
import { IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTodoDto {

  @IsNotEmpty()
  @MinLength(6,     {
      message: "$property est invalide la taille doit être d'au moins $constraint1 caractères"
    }
  )
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @IsOptional()
  description: string;

  @IsIn([
    TodoStatusEnum.waiting,
    TodoStatusEnum.done,
    TodoStatusEnum.actif,
  ], {
    message: `Le status est invalide`
  })
  @IsOptional()
  status: TodoStatusEnum;
}
