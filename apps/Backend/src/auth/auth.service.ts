import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
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

    return user;
  }
}
