import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(512)
  preview: string;
}
