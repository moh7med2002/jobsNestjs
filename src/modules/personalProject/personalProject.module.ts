import { Module } from '@nestjs/common';
import { personalProjectRepositry } from 'src/constants/entityRepositry';
import { PersonalProject } from './personalProject.entity';
import { PersonalProjectService } from './personProject.service';
import { PersonalProjectontroller } from './personalProject.controller';
import { UserModule } from '../user/user.module';
import { PhotoModule } from '../photo/photo.module';

@Module({
  controllers: [PersonalProjectontroller],
  providers: [
    {
      provide: personalProjectRepositry,
      useValue: PersonalProject,
    },
    PersonalProjectService,
  ],
  imports: [UserModule, PhotoModule],
})
export class PersonalProjectModule {}
