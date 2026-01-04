import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  createUser(registerDto: CreateUserDto): { message: string } {
    return { message: 'User created successfully' };
  }
}
