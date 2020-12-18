import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserLoginDto } from './user-login.dto';

export class UserSubscribeDto extends UserLoginDto{

  @IsEmail()
  @IsNotEmpty()
  email;

}
