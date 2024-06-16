import { IsNotEmpty, IsString } from 'class-validator';

export class addBrandDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
