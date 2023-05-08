import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class DtoCreateNews {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  title: string;


  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  content: string;


  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  published: string;
}

export class DtoUpdateNews extends DtoCreateNews {}
