import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, 
        @InjectRepository(User) private userRepository: Repository<User>){}

        async funRegister(objUser: RegisterAuthDto){
            const {password}=objUser
            const plainTohash=await hash(password, 12)
            console.log(plainTohash)

        }
            login(credenciales: LoginAuthDto){

        let payload={email:"admin@gmail.com",id:1} //ojo las comillas
        const token=this.jwtService.sign(payload)
        return {token:token};

    }
}
