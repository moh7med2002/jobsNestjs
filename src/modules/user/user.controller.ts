import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomStorage } from 'src/common/util/custom.storage';
import { UserService } from './user.service';
import { UserLoginDto, UserSignupDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('image', { storage: CustomStorage.storage }))
  userRegister(
    @Body() dto: UserSignupDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('image upload is required');
    }
    return this.userService.signup(dto, image.filename);
  }

  @Post('login')
  userLogin(@Body() dto: UserLoginDto) {
    return this.userService.login(dto);
  }
}
