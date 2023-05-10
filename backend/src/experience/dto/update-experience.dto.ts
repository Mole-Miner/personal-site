import { PartialType } from "@nestjs/mapped-types";

import { DtoCreateExperience } from "./create-experience.dto";

export class DtoUpdateExperience extends PartialType(DtoCreateExperience) {
}
