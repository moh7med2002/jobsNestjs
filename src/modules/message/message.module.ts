import { Module } from '@nestjs/common';
import { messageRepositry } from 'src/constants/entityRepositry';
import { Message } from './message.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: messageRepositry,
      useValue: Message,
    },
  ],
})
export class MessageModule {}
