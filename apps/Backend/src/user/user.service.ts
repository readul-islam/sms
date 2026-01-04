import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UserService {
constructor(@InjectModel(User.name) private UserModel: Model<User>){}
 async createUser(registerDto: CreateUserDto):Promise<UserDocument>{
try {
 return await this.UserModel.create({...registerDto});
  
} catch (error:any) {
  console.log(error)
  const DUPLICATE_STATUS_CODE = 11000;
  const err = error as {code?:Number}
  if(err.code === DUPLICATE_STATUS_CODE){
    throw new ConflictException("Login Id already exist!")
  }
  return error;   
}
  };


  async getUser(loginDto: LoginDto):Promise<UserDocument>{
    const user = await this.UserModel.findOne({loginId:loginDto.loginId, role:loginDto.role}).select("+password");

    if(!user){
      throw new NotFoundException("User didn't exist!")
    }
    return user;
  }
}
