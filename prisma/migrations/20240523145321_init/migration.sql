-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_typeVoucherId_fkey" FOREIGN KEY ("typeVoucherId") REFERENCES "TypeVoucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherUsed" ADD CONSTRAINT "VoucherUsed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherUsed" ADD CONSTRAINT "VoucherUsed_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
