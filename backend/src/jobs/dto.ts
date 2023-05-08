import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString, MaxLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class DtoCreateJobResponsibility {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  content: string;
}

export class DtoUpdateJobResponsibility extends DtoCreateJobResponsibility {
  @IsNumber()
  id: number;

  @IsNumber()
  jobId: number;
}

export class DtoCreateJob {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  company: string;


  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  periodStart: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  periodEnd: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  technology: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DtoCreateJobResponsibility)
  responsibilities: DtoCreateJobResponsibility[];
}

export class DtoUpdateJob extends DtoCreateJob {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DtoUpdateJobResponsibility)
  responsibilities: DtoUpdateJobResponsibility[];
}
