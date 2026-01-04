import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/DTO/register.dto';

@Injectable()
export class UserService {
  createUser(registerDto: RegisterDto): { message: string } {
    return { message: 'User created successfully' };
  }
}
