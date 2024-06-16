import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class addTypeShipDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
