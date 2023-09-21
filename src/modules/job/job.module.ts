import { Module } from '@nestjs/common';
import { jobRepositry } from 'src/constants/entityRepositry';
import { Job } from './job.entity';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { PriceModule } from '../price/price.module';

@Module({
  controllers: [JobController],
  providers: [
    {
      provide: jobRepositry,
      useValue: Job,
    },
    JobService,
  ],
  exports: [JobService],
  imports: [CategoryModule, UserModule, PriceModule],
})
export class JobModule {}
