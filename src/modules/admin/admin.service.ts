import { Injectable, Inject } from '@nestjs/common';
import { Admin } from './admin.entity';
import { AdminAuthDto } from './dto';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { adminRepositry } from 'src/constants/entityRepositry';
import { generateToken } from 'src/common/util/generateToken';
import { VerifyPassword, hashPassword } from 'src/common/util/passwordUtil';

@Injectable()
export class AdminService {
  constructor(
    @Inject(adminRepositry)
    private adminRepository: typeof Admin,
  ) {}

  async signup(dto: AdminAuthDto): Promise<{ msg: string }> {
    const isAdmin = await this.adminRepository.count();
    if (isAdmin > 0) {
      throw new ForbiddenException('cant have two admin account');
    }
    const hashPas = await hashPassword(dto.password);
    const newAdmin = await this.adminRepository.create({
      email: dto.email,
      password: hashPas,
    });
    return { msg: 'Admin has been created' };
  }

  async login(
    dto: AdminAuthDto,
  ): Promise<{ msg: string; admin: Admin; token: string }> {
    const isAdminFound = await this.adminRepository.findOne({
      where: { email: dto.email },
    });
    if (!isAdminFound) {
      throw new ForbiddenException('email not found');
    }
    const isMatch = await VerifyPassword(dto.password, isAdminFound.password);
    if (!isMatch) {
      throw new ForbiddenException('invalid password');
    }
    delete isAdminFound.password;
    const payload = { userId: isAdminFound.id, role: 'admin' };
    const access_token = generateToken(payload);
    const { password, ...others } = isAdminFound.toJSON();
    return { msg: 'admin login success', admin: others, token: access_token };
  }
}
