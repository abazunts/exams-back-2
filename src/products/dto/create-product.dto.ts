import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @Length(5, 50)
  @IsString()
  title: string;

  @Length(10, 400)
  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;
}
