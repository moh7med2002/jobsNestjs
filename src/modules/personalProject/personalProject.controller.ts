import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  Param,
  UseInterceptors,
  UploadedFiles,
  Get,
  Delete,
} from '@nestjs/common';
import { PersonalProjectService } from './personProject.service';
import { personProjectDto } from './dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CustomStorage } from 'src/common/util/custom.storage';
import { SaveUser } from 'src/common/decorator/SaveUser';
import { tokenPayload } from 'src/common/types/payload.token';
import { TokenGuard } from 'src/common/util/token.guards';
import { Role } from 'src/common/types/role.enum';
import { Roles } from 'src/common/decorator/roles.decorator';

@Controller('work')
export class PersonalProjectontroller {
  constructor(private personalProjectService: PersonalProjectService) {}

  @Post('create')
  @UseGuards(TokenGuard)
  @Roles(Role.Buyer)
  @UseInterceptors(
    FilesInterceptor('images', 10, { storage: CustomStorage.storage }),
  )
  create(
    @Body() dto: personProjectDto,
    @UploadedFiles() images: Express.Multer.File[],
    @SaveUser() user: tokenPayload,
  ) {
    return this.personalProjectService.create(dto, images, user.userId);
  }

  @Get('all/:userId')
  getAll(@Param('userId') userId: string) {
    return this.personalProjectService.getUserpersonalProjects(+userId);
  }

  @Get(':id')
  getSingel(@Param('id') id: string) {
    return this.personalProjectService.getSinglePersonalProject(id);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  @Roles(Role.Buyer)
  deleteSingleWork(@Param('id') id: string, @SaveUser() user: tokenPayload) {
    return this.personalProjectService.deleteSingleProject(id, user.userId);
  }
}
