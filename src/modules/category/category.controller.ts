import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  Param,
  Get,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { TokenGuard } from 'src/common/util/token.guards';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  @UseGuards(TokenGuard)
  @Roles(Role.Admin)
  create(@Body() dto: CategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Put('update/:categoryId')
  @UseGuards(TokenGuard)
  @Roles(Role.Admin)
  update(@Body() dto: CategoryDto, @Param('categoryId') categoryId: string) {
    return this.categoryService.updateCategory(dto, categoryId);
  }

  @Get('all')
  getAll() {
    return this.categoryService.fetchAll();
  }
}
