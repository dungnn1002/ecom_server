import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServices } from './user.services';

@Module({
  controllers: [UserController],
  providers: [UserServices],
  exports: [UserServices],
})
export class UserModule {}
