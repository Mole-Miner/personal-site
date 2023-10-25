import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

function transformQueryField(params: TransformFnParams): boolean {
  return params.value === 'true';
}

export class ExperienceQuery {
  @ApiProperty()
  @IsBoolean()
  @Transform(transformQueryField)
  company: boolean;

  @ApiProperty()
  @IsBoolean()
  @Transform(transformQueryField)
  accomplishments: boolean;

  @ApiProperty()
  @IsBoolean()
  @Transform(transformQueryField)
  pictures: boolean;
}
