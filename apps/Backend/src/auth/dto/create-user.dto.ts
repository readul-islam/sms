import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../user/schemas/user.schema';

export class CreateUserDto {
  @IsEnum(UserRole)
  role!: UserRole;

  @IsString()
  @IsNotEmpty()
  loginId!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
