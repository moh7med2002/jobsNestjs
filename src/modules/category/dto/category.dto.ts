import { IsNotEmpty, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CategoryDto {
  @Length(3)
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsNotEmpty()
  title: string;
}
