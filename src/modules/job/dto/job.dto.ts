import {
  IsNotEmpty,
  Min,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'greaterThanMinPrice', async: false })
export class GreaterThanMinPriceConstraint
  implements ValidatorConstraintInterface
{
  validate(maxPrice: number, args: ValidationArguments) {
    const minPrice = (args.object as JobDto).minPrice;
    return maxPrice > minPrice;
  }

  defaultMessage(args: ValidationArguments) {
    return `maxPrice must be greater than minPrice`;
  }
}

export class JobDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Min(1)
  duration: number;

  @IsNotEmpty()
  @Min(1)
  minPrice: number;

  @IsNotEmpty()
  @Min(1)
  @Validate(GreaterThanMinPriceConstraint, {
    message: 'maxPrice must be greater than minPrice',
  })
  maxPrice: number;

  @IsNotEmpty()
  categoryId: number | string;
}
