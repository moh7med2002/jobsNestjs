import { Module } from '@nestjs/common';
import { personalProjectRepositry } from 'src/constants/entityRepositry';
import { PersonalProject } from './personalProject.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: personalProjectRepositry,
      useValue: PersonalProject,
    },
  ],
})
export class PersonalProjectModule {}
