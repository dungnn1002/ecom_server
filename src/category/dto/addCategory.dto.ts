import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class addCategoryDTO {
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsNumber()
  @IsNotEmpty()
  brandId: number;
}
