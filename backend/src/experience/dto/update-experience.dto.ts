import { PartialType } from '@nestjs/mapped-types';

import {
  CreateExperienceDto,
  CreateExperiencePicture,
} from './create-experience.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateExperiencePicture extends PartialType(
  CreateExperiencePicture,
) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  id: string;
}

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {}

export class UpdateExperienceWithPictures extends PartialType(
  UpdateExperienceDto,
) {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(6)
  @Type(() => UpdateExperiencePicture)
  pictures: UpdateExperiencePicture[];
}
