import { IsNotEmpty, IsString } from 'class-validator';
export class addCodeVoucherDTO {
  @IsString()
  @IsNotEmpty()
  codeVoucher: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  typeVoucherId: number;

  @IsNotEmpty()
  fromDate: Date;

  @IsNotEmpty()
  toDate: Date;
}
