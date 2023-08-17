import { Module } from '@nestjs/common';
import { Admin } from './admin.entity';
import { adminRepositry } from 'src/constants/entityRepositry';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  controllers: [AdminController],
  providers: [
    {
      provide: adminRepositry,
      useValue: Admin,
    },
    AdminService,
  ],
})
export class AdminModule {}
