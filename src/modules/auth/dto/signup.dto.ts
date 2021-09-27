import { IsEmail, IsNotEmpty } from 'class-validator';

export default class SignupDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
