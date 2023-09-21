import { IsNotEmpty } from 'class-validator';

export class personProjectDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
