import { PartialType } from "@nestjs/mapped-types";

import { DtoCreateCompany } from "./create-company.dto";

export class DtoUpdateCompany extends PartialType(DtoCreateCompany) {
}
