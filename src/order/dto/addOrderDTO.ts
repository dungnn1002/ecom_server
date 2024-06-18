import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class addOrderDTO {
  @IsNotEmpty()
  addressUserId: number;
  @IsNotEmpty()
  typeShipId: number;
  @IsNotEmpty()
  isPaymentOnline: boolean;
  @IsNotEmpty()
  voucherId: number;
  @IsNotEmpty()
  productSizeId: number;
  @IsNotEmpty()
  quantity: number;
}
