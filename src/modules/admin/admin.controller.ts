import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminAuthDto } from './dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Post('/signup')
  adminSignup(@Body() dto: AdminAuthDto) {
    return this.adminService.signup(dto);
  }

  @Post('/login')
  adminLogin(@Body() dto: AdminAuthDto) {
    return this.adminService.login(dto);
  }
}
