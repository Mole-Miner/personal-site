import { IsEmail, IsStrongPassword, MaxLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  username: string;

  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  @MaxLength(32)
  password: string;
}
