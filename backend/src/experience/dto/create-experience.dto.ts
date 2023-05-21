import { IsNotEmpty, IsString, MaxLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class DtoCreateExperienceImage {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  type: string;

  @IsString()
  @IsNotEmpty()
  data: string;
}

export class DtoCreateExperience {
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
  @MaxLength(32)
  companyId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoCreateExperienceImage)
  image: DtoCreateExperienceImage;
}
