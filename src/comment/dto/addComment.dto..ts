import { IsNotEmpty, IsString } from 'class-validator';

export class addCommentDTO {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  star: number;
}
