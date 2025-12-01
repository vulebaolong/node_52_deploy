import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Min,
  IsUppercase,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'long@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: '1234' })
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  //   @IsUppercase()
  password: string;
}
