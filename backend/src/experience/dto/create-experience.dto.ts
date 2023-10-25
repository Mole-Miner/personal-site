import {
  ArrayMaxSize,
  IsArray,
  IsDateString,
  IsISO8601,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateExperiencePicture {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(8)
  @Matches(/exterior|interior/)
  side: 'exterior' | 'interior';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  @Matches(/mobile|tablet|laptop/)
  screen: 'mobile' | 'tablet' | 'laptop';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  imageId: string;
}

export class CreateExperienceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  position: string;

  @ApiProperty()
  @IsISO8601()
  @IsNotEmpty()
  @MaxLength(32)
  start: string;

  @ApiProperty()
  @IsISO8601()
  @IsNotEmpty()
  @MaxLength(32)
  end: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  companyId: string;
}

export class CreateExperienceWithPicturesDto extends CreateExperienceDto {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(6)
  @Type(() => CreateExperiencePicture)
  pictures: CreateExperiencePicture[];
}
