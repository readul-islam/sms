import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registerDto: CreateUserDto) {
    const token = await this.authService.registerUser(registerDto);
    return token;
  };


  @Post('login')
  async login(@Body() loginDto: LoginDto){
    const token = await this.authService.loginUser(loginDto);
    return token;
  }
  @Post('profile')
    @UseGuards(AuthGuard)
  async getProfile(@Request() req:any){
    return {user:req.user}
  }
}
