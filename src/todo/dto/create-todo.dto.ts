import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTodoDto {

  @IsNotEmpty()
  @MinLength(6,     {
      message: "$property est invalide la taille doit être d'au moins $constraint1 caractères"
    }
  )
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;
}
