import { Module } from '@nestjs/common';
import { voucherController } from './voucher.controller';
import { voucherService } from './voucher.service';
@Module({
  controllers: [voucherController],
  providers: [voucherService],
  exports: [voucherService],
})
export class VoucherModule {}
