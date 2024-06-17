import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class addAddressDTO {
  @IsNotEmpty()
  userId: number;

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
