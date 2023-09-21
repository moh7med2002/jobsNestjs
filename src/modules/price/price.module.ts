import { Module } from '@nestjs/common';
import { jobPriceRepositry } from 'src/constants/entityRepositry';
import { Price } from './price.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: jobPriceRepositry,
      useValue: Price,
    },
  ],
  exports: [jobPriceRepositry],
})
export class PriceModule {}
