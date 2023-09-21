import { Injectable, Inject } from '@nestjs/common';
import {
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common/exceptions';
import { userRepositry } from 'src/constants/entityRepositry';
import { generateToken } from 'src/common/util/generateToken';
import { VerifyPassword, hashPassword } from 'src/common/util/passwordUtil';
import { User } from './user.entity';
import { UserLoginDto, UserSignupDto, UserUpdateDto } from './dto';
import { Op } from 'sequelize';
import { Proposal } from '../proposal/proposal.entity';

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
      name: dto.name,
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
    const payload = { userId: isUserFound.id, role: isUserFound.role };
    const access_token = generateToken(payload);
    const { password, ...others } = isUserFound.toJSON();
    return { msg: 'Login success', user: others, token: access_token };
  }

  async updateProfile(dto: UserUpdateDto, image: string, userId: number) {
    const user = await this.userById(userId.toString());
    user.name = dto.name;
    user.job = dto.job;
    user.biography = dto.biography;
    if (image) {
      user.image = image;
    }
    await user.save();
    return { message: 'update profile success' };
  }

  async allUsers(page: string, searchName: string) {
    const currentPage = parseInt(page) || 1;
    const perPage = 10;
    const offset = (currentPage - 1) * perPage;

    let whereCondition = {};
    if (searchName) {
      whereCondition = { name: { [Op.like]: `%${searchName}%` } };
    }

    const { count, rows } = await this.userRepositry
      .scope('importantFiled')
      .findAndCountAll({
        where: { ...whereCondition, role: { [Op.ne]: 'seller' } },
        order: [['createdAt', 'DESC']],
        offset: offset,
        limit: perPage,
      });
    const totalPages = Math.ceil(count / perPage);
    const hasMore = currentPage < totalPages;
    return { users: rows, count, totalPages, hasMore };
  }

  async userById(userId) {
    const user = await this.userRepositry
      .scope('importantFiled')
      .findByPk(userId);
    if (!user) {
      throw new BadRequestException('user nor found');
    }
    return user;
  }
}
