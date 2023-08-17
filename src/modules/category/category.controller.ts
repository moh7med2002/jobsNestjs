import { Body, Controller, Post, UseGuards, Put, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { roleAuthGuardFactory } from 'src/common/util/guards.stradegey';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  @UseGuards(roleAuthGuardFactory('admin'))
  create(@Body() dto: CategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Put('update/:categoryId')
  @UseGuards(roleAuthGuardFactory('admin'))
  update(@Body() dto: CategoryDto, @Param('categoryId') categoryId: string) {
    return this.categoryService.updateCategory(dto, categoryId);
  }
}
