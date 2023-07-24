import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ExperienceQuery {
  @ApiProperty()
  @IsBoolean()
  company: boolean;

  @ApiProperty()
  @IsBoolean()
  accomplishments: boolean;

  @ApiProperty()
  @IsBoolean()
  images: boolean;
}
