import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  ValidateNested
} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateExperienceImage {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  // @MaxLength(8)
  @Matches(/exterior|interior/)
  side: 'exterior' | 'interior';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  mobileImageId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  tabletImageId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  laptopImageId: string;
}

export class CreateExperienceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  position: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  start: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  end: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  companyId: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Type(() => CreateExperienceImage)
  images: CreateExperienceImage[];
}
