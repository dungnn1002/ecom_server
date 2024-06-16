import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class addTypeVoucherDTO {
  @IsString()
  @IsNotEmpty()
  typeVoucher: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsNumber()
  @IsNotEmpty()
  minValue: number;

  @IsNumber()
  @IsNotEmpty()
  maxValue: number;
}
