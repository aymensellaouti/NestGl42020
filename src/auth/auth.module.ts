import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PassportJwtStrategy } from './strategy/passport-jwt.strategy';

dotenv.config();
@Module({
  controllers: [AuthController],
  providers: [AuthService, PassportJwtStrategy],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 36000
      }
    })
  ]
})
export class AuthModule {}
