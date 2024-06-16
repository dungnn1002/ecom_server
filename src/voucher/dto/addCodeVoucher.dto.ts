import { IsNotEmpty, IsString } from 'class-validator';

/**
 * model Voucher {
  id            Int            @id @default(autoincrement())
  fromDate      DateTime?      @db.Timestamptz(3)
  toDate        DateTime?      @db.Timestamptz(3)
  typeVoucherId Int?
  typeVoucher   TypeVoucher?   @relation(fields: [typeVoucherId], references: [id])
  amount        Int?
  codeVoucher   String?
  createdAt     DateTime?      @default(now()) @db.Timestamptz(3)
  updatedAt     DateTime?      @updatedAt @db.Timestamptz(3)
  OrderProduct  OrderProduct[]
  VoucherUsed   VoucherUsed[]
}
 */
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
