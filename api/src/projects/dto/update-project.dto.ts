import { PartialType } from "@nestjs/swagger"
import { BaseProjectDto } from "./base-project.dto"

export class UpdateProjectDto extends PartialType(BaseProjectDto) {}
