import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServices } from './user.services';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [UserController],
  providers: [UserServices],
  exports: [UserServices],
})
export class UserModule {}
