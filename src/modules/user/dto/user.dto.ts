import { IsNotEmpty, IsEmail, Length, IsEnum } from 'class-validator';
import { UserRole } from 'src/constants/enums';

export class UserSignupDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email cant be empty' })
  email: string;

  @Length(3, 12)
  @IsNotEmpty({ message: 'Password cant be empty' })
  password: string;

  @IsNotEmpty({ message: 'Name cant be empty' })
  name: string;

  @IsNotEmpty({ message: 'Biograpgy cant be empty' })
  biography: string;

  @IsNotEmpty({ message: 'Country cant be empty' })
  country: string;

  @IsEnum(UserRole, { message: 'not valid user role' })
  role: UserRole;
}

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(3, 12)
  @IsNotEmpty()
  password: string;
}
