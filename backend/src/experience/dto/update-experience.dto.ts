import { PartialType } from '@nestjs/mapped-types';

import { CreateExperienceDto, CreateExperienceImage } from './create-experience.dto';

export class UpdateExperienceImage extends PartialType(CreateExperienceImage) {}

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {}
