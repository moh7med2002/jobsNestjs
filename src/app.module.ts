import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CustomStorage } from './common/util/custom.storage';
import { JwtModule } from '@nestjs/jwt';
import { GatewayModule } from './geteway/geteway.module';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { JobModule } from './modules/job/job.module';
import { PriceModule } from './modules/price/price.module';
import { PersonalProjectModule } from './modules/personalProject/personalProject.module';
import { PhotoModule } from './modules/photo/photo.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ProposalModule } from './modules/proposal/proposal.module';

@Module({
  imports: [
    JwtModule.register({ global: true, secret: 'token' }),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: CustomStorage.storage,
      }),
    }),
    DatabaseModule,
    GatewayModule,
    AdminModule,
    CategoryModule,
    UserModule,
    JobModule,
    PriceModule,
    PersonalProjectModule,
    PhotoModule,
    FeedbackModule,
    NotificationModule,
    ProposalModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
