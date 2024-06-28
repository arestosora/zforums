import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength, isString } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;
  
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
  }
  
  export class RegisterDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;
  
    @IsEmail()
    email: string;
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    avatar: string;
  
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
  }
  