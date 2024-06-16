import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  static password(password: any) {
    throw new Error('Method not implemented.');
  }
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
