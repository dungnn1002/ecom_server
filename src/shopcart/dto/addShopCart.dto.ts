import { IsNotEmpty } from 'class-validator';

export class addShopCartDTO {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  productSizeId: number;

  @IsNotEmpty()
  quantity: number;
}
