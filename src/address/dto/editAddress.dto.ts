import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class editAddressDTO {
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  shipName: string;

  @IsEmail()
  @IsNotEmpty()
  shipEmail: string;

  @IsString()
  @IsNotEmpty()
  shipPhone: string;

  @IsString()
  @IsNotEmpty()
  shipAddress: string;
}
