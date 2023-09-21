import { Module } from '@nestjs/common';
import { photeRepositry } from 'src/constants/entityRepositry';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

@Module({
  controllers: [],
  providers: [
    {
      provide: photeRepositry,
      useValue: Photo,
    },
    PhotoService,
  ],
  exports: [PhotoService],
})
export class PhotoModule {}
