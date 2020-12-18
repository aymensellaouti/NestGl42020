import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { UserEntity } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepositor: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  async register(userSubscribeDto: UserSubscribeDto): Promise<Partial<UserEntity>> {
    const user = this.userRepositor.create({
      ...userSubscribeDto
    });
    //Créer un salt
    user.salt = await bcrypt.genSalt();
    // hasher son mdp
    user.password = await bcrypt.hash(user.password, user.salt);
    try{
      await this.userRepositor.save(user);
    } catch (e) {
      throw new ConflictException(`username ou email redondant. Ils doivent être unique`);
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
  }

  async login(credentials: UserLoginDto) {
    // Récupérer le username + pwd
    const {username, password} = credentials;
    // vérifier s'il y a un user avec ce username
    const user = await this.userRepositor.findOne({username});

      // Si non username ou pwd innexistant
      if(!user) {
        // Si non username ou pwd innexistant
        throw new NotFoundException('username ou password erroné');
      } else {
        // Si oui
        // Je hash le password avec le salt du user

        // const hashedPassword = bcrypt.hash(password, users[0].salt);
        // si egal au pwd du user return ok
        // if (hashedPassword === users[0].password) {
        if ( await bcrypt.compare(password, user.password)) {
          const payload = {
            username: user.username,
            email: user.email,
            role: user.role
          }
          const jwt = this.jwtService.sign(payload);
          return  {
            "access_token" : jwt
          }
        } else {
          throw new NotFoundException('username ou password erroné');
        }
        // sinon
        //username ou pwd innexistant

      }
  }
}
