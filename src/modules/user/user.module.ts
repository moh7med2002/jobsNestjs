import { Module } from '@nestjs/common';
import { userRepositry } from 'src/constants/entityRepositry';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: userRepositry,
      useValue: User,
    },
    UserService,
  ],
})
export class UserModule {}
