import { Module } from '@nestjs/common';
import { userRepositry } from 'src/constants/entityRepositry';
import { User } from './user.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: userRepositry,
      useValue: User,
    },
  ],
})
export class UserModule {}
