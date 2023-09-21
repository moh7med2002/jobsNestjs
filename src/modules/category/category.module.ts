import { Module } from '@nestjs/common';
import { categoryRepositry } from 'src/constants/entityRepositry';
import { Category } from './category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [
    {
      provide: categoryRepositry,
      useValue: Category,
    },
    CategoryService,
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
