import { PartialType } from "@nestjs/mapped-types";

export class CreateUserDto {
    email: string;
    password: string;
    name?: string;
    avatar?:string;
  }
  
  export class UpdateUserDto extends PartialType(CreateUserDto) {}
