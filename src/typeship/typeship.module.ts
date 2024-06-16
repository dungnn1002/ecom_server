import { Module } from '@nestjs/common';
import { TypeShipController } from './typeship.controller';
import { TypeShipService } from './typeship.service';
@Module({
  controllers: [TypeShipController],
  providers: [TypeShipService],
  exports: [TypeShipService],
})
export class TypeshipModule {}
