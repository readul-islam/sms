import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { RegisterDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async registerUser(registerDto: RegisterDto) {
    /* 
   
   1. Hash the password from registerDto
   */
    const salt = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);

    return this.userService.createUser({
      ...registerDto,
      password: hashedPassword,
    });
  }
}
