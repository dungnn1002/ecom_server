import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.services';
@Module({
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
