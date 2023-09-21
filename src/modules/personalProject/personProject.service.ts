import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { personalProjectRepositry } from 'src/constants/entityRepositry';
import { Op } from 'sequelize';
import { PersonalProject } from './personalProject.entity';
import { personProjectDto } from './dto';
import { UserService } from '../user/user.service';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PersonalProjectService {
  constructor(
    @Inject(personalProjectRepositry)
    private personalProjectRepositry: typeof PersonalProject,
    private userService: UserService,
    private photoService: PhotoService,
  ) {}

  async create(
    dto: personProjectDto,
    images: Express.Multer.File[],
    userId: number,
  ) {
    await this.userService.userById(userId);
    const savedWork = await this.personalProjectRepositry.create({
      title: dto.title,
      description: dto.description,
      userId,
    });
    let files = [];
    for (const img of images) {
      files.push({ projectId: savedWork.id, path: img.filename });
    }
    await this.photoService.insertPhotostoWork(files);
    return { message: 'Create personal work success' };
  }

  async getUserpersonalProjects(userId: number) {
    const works = await this.personalProjectRepositry
      .scope('withoutTimeStamps')
      .findAll({
        where: {
          userId,
        },
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: Photo,
            attributes: ['id', 'path'],
            limit: 1,
          },
        ],
      });
    return { works };
  }

  async getSinglePersonalProject(id: string) {
    const work = await this.personalProjectRepositry.findOne({
      where: { id: id },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
        {
          model: Photo,
          attributes: ['id', 'path'],
        },
      ],
    });
    if (!work) {
      throw new BadRequestException('Invalid Id');
    }
    return { work };
  }

  async deleteSingleProject(id: string, userId: number) {
    const work = await this.personalProjectRepositry.findOne({
      where: { id: id, userId: userId },
    });
    if (!work) {
      throw new BadRequestException('delete failed');
    }
    await this.photoService.deleteFiles(work.id);
    await work.destroy();
    return { message: 'deleted success' };
  }
}
