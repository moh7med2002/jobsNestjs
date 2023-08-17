import { Module } from '@nestjs/common';
import { feedbackRepositry } from 'src/constants/entityRepositry';
import { Feedback } from './feedback.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: feedbackRepositry,
      useValue: Feedback,
    },
  ],
})
export class FeedbackModule {}
