import { Injectable, Inject } from '@nestjs/common';
import {
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common/exceptions';
import { userRepositry } from 'src/constants/entityRepositry';
import { generateToken } from 'src/common/util/generateToken';
import { VerifyPassword, hashPassword } from 'src/common/util/passwordUtil';
import { User } from './user.entity';
import { UserLoginDto, UserSignupDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(userRepositry)
    private userRepositry: typeof User,
  ) {}

  async signup(dto: UserSignupDto, image: string) {
    const userFound = await this.userRepositry.findOne({
      where: { email: dto.email },
    });
    if (userFound) {
      throw new BadRequestException('Invalid Email');
    }
    const hashPs = await hashPassword(dto.password);
    await this.userRepositry.create({
      name: dto.biography,
      biography: dto.biography,
      email: dto.email,
      role: dto.role,
      country: dto.country,
      image,
      password: hashPs,
      job: dto.job,
    });
    return { msg: 'Your account been created' };
  }

  async login(dto: UserLoginDto) {
    const isUserFound = await this.userRepositry
      .scope('withoutTimeStamps')
      .findOne({
        where: { email: dto.email },
      });
    if (!isUserFound) {
      throw new ForbiddenException('Email not found');
    }
    const isMatch = await VerifyPassword(dto.password, isUserFound.password);
    if (!isMatch) {
      throw new ForbiddenException('Invalid password');
    }
    delete isUserFound.password;
    const payload = { userId: isUserFound.id, role: 'user' };
    const access_token = generateToken(payload);
    const { password, ...others } = isUserFound.toJSON();
    return { msg: 'Login success', user: others, token: access_token };
  }
}
