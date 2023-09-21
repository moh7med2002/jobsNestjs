import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { categoryRepositry } from 'src/constants/entityRepositry';
import { Category } from './category.entity';
import { CategoryDto } from './dto/category.dto';
import { Op } from 'sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(categoryRepositry)
    private categoryRepositry: typeof Category,
  ) {}

  async createCategory(dto: CategoryDto) {
    const categoryWithTitle = await this.categoryRepositry.findOne({
      where: {
        title: dto.title,
      },
    });
    if (categoryWithTitle) {
      throw new BadRequestException('this category already exist');
    }
    await this.categoryRepositry.create({
      title: dto.title,
    });
    return { msg: 'create category successfully' };
  }

  async updateCategory(dto: CategoryDto, categoryId: string) {
    const categoryById = await this.categoryRepositry.findByPk(categoryId);
    if (!categoryById) {
      throw new BadRequestException('category invalid id');
    }
    // check if there is another category have the same title
    const categoryWithTitle = await this.categoryRepositry.findOne({
      where: { title: dto.title, id: { [Op.ne]: categoryId } },
    });
    if (categoryWithTitle) {
      throw new BadRequestException('There is another category with this name');
    }
    categoryById.title = dto.title;
    await categoryById.save();
    return { msg: 'update category successfully' };
  }

  async fetchAll() {
    const categories = await this.categoryRepositry.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return { categories };
  }

  async categoryById(id) {
    const category = await this.categoryRepositry.findByPk(id);
    if (!category) {
      throw new BadRequestException('invalid category id');
    }
    return category;
  }
}
