import { PartialType } from '@nestjs/swagger';

import { CreateAccomplishmentDto } from './create-accomplishment.dto';

export class UpdateAccomplishmentDto extends PartialType(
  CreateAccomplishmentDto,
) {}
