import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class AdminAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(3, 12)
  @IsNotEmpty()
  password: string;
}
