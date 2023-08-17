import { Module } from '@nestjs/common';
import { jobRepositry } from 'src/constants/entityRepositry';
import { Job } from './job.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: jobRepositry,
      useValue: Job,
    },
  ],
})
export class JobModule {}
