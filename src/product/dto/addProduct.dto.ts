import { IsNotEmpty, IsString, IsArray } from 'class-validator';

class TypeSize {
  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  quantity: number;
}

export class addProductDTO {
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

  @IsArray()
  sizes: TypeSize[];
}
