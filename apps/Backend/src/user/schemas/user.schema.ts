import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
}

@Schema({
  timestamps: true, // auto adds createdAt & updatedAt
})
export class User {
  @Prop({
    type: String,
    enum: UserRole,
    required: true,
    index: true,
  })
  role!: UserRole;

  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
  })
  loginId!: string; // admissionNo / email / employeeId

  @Prop({
    type: String,
    required: true,
    select: false, // 🔐 hide password by default
  })
  passwordHash!: string;

  @Prop({
    type: String,
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;

  @Prop({
    type: Date,
    default: null,
  })
  lastLoginAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
