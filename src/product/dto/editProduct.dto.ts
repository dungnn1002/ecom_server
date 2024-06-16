import { IsNotEmpty, IsString } from 'class-validator';

export class editProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  material: string;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  brandId: number;

  @IsString()
  // @IsNotEmpty()
  contentHTML: string;

  @IsString()
  // @IsNotEmpty()
  contentMarkdown: string;

  @IsNotEmpty()
  originalPrice: number;

  @IsNotEmpty()
  discountPrice: number;
}
