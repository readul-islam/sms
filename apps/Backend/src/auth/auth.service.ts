import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';



@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,     private readonly jwtService: JwtService
) {}
  async registerUser(registerDto: CreateUserDto) {
    /* 
   
   1. Hash the password from registerDto
   */
    const salt = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);

    const user = await  this.userService.createUser({
      ...registerDto,
      password: hashedPassword,
    });
      const payload = { sub: user._id, loginId:user.loginId ,role:user.role};
      const token = await this.jwtService.signAsync(payload);



    return {access_token:token};
  };

  async loginUser (loginDto:LoginDto){
   const user = await this.userService.getUser(loginDto);
   const isMatchPassword = await bcrypt.compare(loginDto.password, user.password);

     if (!isMatchPassword) {
      throw new UnauthorizedException("Unauthorized");
    }

     const payload = { sub: user._id, loginId:user.loginId ,role:user.role};
      const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token
    }
  }
}



