import { Module } from '@nestjs/common';
import { ShopCartService } from './shopcart.service';
import { ShopCartController } from './shopcart.controller';
@Module({
  controllers: [ShopCartController],
  providers: [ShopCartService],
  exports: [ShopCartService],
})
export class ShopcartModule {}
