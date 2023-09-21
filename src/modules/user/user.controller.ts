import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
  BadRequestException,
  UseGuards,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomStorage } from 'src/common/util/custom.storage';
import { UserService } from './user.service';
import { UserLoginDto, UserSignupDto, UserUpdateDto } from './dto';
import { SaveUser } from 'src/common/decorator/SaveUser';
import { tokenPayload } from 'src/common/types/payload.token';
import { TokenGuard } from 'src/common/util/token.guards';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';

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

  @Put('update')
  @UseGuards(TokenGuard)
  @Roles(Role.Buyer, Role.Seller)
  @UseInterceptors(FileInterceptor('image', { storage: CustomStorage.storage }))
  userUpdate(
    @Body() dto: UserUpdateDto,
    @UploadedFile() image: Express.Multer.File,
    @SaveUser() user: tokenPayload,
  ) {
    return this.userService.updateProfile(
      dto,
      image ? image.filename : '',
      user.userId,
    );
  }

  @Get('all')
  allUsers(@Query('page') page: string, @Query('name') name: string) {
    return this.userService.allUsers(page, name);
  }

  @Get(':userId')
  userById(@Param('userId') userId: string) {
    return this.userService.userById(userId);
  }
}
