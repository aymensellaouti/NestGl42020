import { Body, Controller, Post } from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { AuthService } from './auth.service';
import { UserEntity } from './entities/user.entity';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('register')
  register(
    @Body() userSubscribeData: UserSubscribeDto
  ): Promise<Partial<UserEntity>> {
    return this.authService.register(userSubscribeData);
  }

  @Post('login')
  login(
    @Body() credentials: UserLoginDto
  ): Promise<any> {
    return this.authService.login(credentials);
  }
}
