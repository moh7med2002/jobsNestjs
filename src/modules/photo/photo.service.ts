import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { photeRepositry } from 'src/constants/entityRepositry';
import { Op } from 'sequelize';
import { Photo } from './photo.entity';
import { clearFile } from 'src/common/util/clearFile';

@Injectable()
export class PhotoService {
  constructor(
    @Inject(photeRepositry)
    private photeRepositry: typeof Photo,
  ) {}

  async insertPhotostoWork(files) {
    await this.photeRepositry.bulkCreate(files);
  }

  async deleteFiles(workId) {
    const photos = await this.photeRepositry.findAll({
      where: { projectId: workId },
    });
    for (const pho of photos) {
      clearFile(pho.path);
    }
  }
}
