import { IsNotEmpty, Min } from 'class-validator';

export class ProposalDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Min(1)
  duration: number;

  @IsNotEmpty()
  @Min(50, { message: 'Price not less than 50' })
  price: number;
}
