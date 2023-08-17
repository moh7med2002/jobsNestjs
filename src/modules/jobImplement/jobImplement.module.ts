import { Module } from '@nestjs/common';
import { jobImplementRepositry } from 'src/constants/entityRepositry';
import { JobImplement } from './jobImplement.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: jobImplementRepositry,
      useValue: JobImplement,
    },
  ],
})
export class JobImplementModule {}
