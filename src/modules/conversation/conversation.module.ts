import { Module } from '@nestjs/common';
import { conversationRepositry } from 'src/constants/entityRepositry';
import { Conversation } from './conversation.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: conversationRepositry,
      useValue: Conversation,
    },
  ],
})
export class ConversationModule {}
