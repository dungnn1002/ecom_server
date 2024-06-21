import { IsArray, IsNotEmpty } from 'class-validator';

class typeDataShopCart {
  @IsNotEmpty()
  productSizeId: number;
  @IsNotEmpty()
  quantity: number;
}
export class addOrderDTO {
  @IsNotEmpty()
  addressUserId: number;
  @IsNotEmpty()
  typeShipId: number;
  @IsNotEmpty()
  isPaymentOnline: number;
  @IsNotEmpty()
  voucherId: number;
  @IsArray()
  shopCart: typeDataShopCart[];
  @IsNotEmpty()
  totalPrice: number;
}
