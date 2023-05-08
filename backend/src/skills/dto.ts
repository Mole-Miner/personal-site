import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class DtoCreatSkill {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  title: string;
}

export class DtoUpdateSkill extends DtoCreatSkill {}
