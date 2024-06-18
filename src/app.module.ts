import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { TypeshipModule } from './typeship/typeship.module';
import { VoucherModule } from './voucher/voucher.module';
import { UploadModule } from './upload/upload.module';
import { ProductModule } from './product/product.module';
import { ShopcartModule } from './shopcart/shopcart.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), //config module
    AuthModule,
    UserModule,
    PrismaModule,
    BrandModule,
    CategoryModule,
    TypeshipModule,
    VoucherModule,
    UploadModule,
    ProductModule,
    ShopcartModule,
    AddressModule,
    OrderModule,
  ],
})
export class AppModule {}
