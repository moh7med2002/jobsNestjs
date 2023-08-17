import { Module } from '@nestjs/common';
import { photeRepositry } from 'src/constants/entityRepositry';
import { Photo } from './photo.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: photeRepositry,
      useValue: Photo,
    },
  ],
})
export class PhotoModule {}
