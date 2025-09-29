import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class BaseUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  username: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
