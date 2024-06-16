import { IsNotEmpty, IsString } from 'class-validator';

export class editCategoryDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  brandId: number;
}
