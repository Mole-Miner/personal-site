import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class DtoCreateCompany {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(512)
  preview: string;
}
