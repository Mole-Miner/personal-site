import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  position: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  start: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  end: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  companyId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  imageId: string;
}
