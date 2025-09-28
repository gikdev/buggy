import { PartialType } from "@nestjs/swagger"
import { BaseBugDto } from "./base-bug.dto"

export class UpdateBugDto extends PartialType(BaseBugDto) {}
