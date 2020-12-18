import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';

dotenv.config();

export class PassportJwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET
    });
  }

  async validate(payload) {
    console.log('in validate');
    const user = await this.userRepository.findOne({username: payload.username});
    if (user) {
      delete user.salt;
      delete user.password;
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
