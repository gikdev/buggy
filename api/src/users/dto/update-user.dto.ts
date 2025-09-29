import { PartialType, PickType } from "@nestjs/swagger"
import { BaseUserDto } from "./base-user.dto"

export class UpdateUserDto extends PartialType(
  PickType(BaseUserDto, ["name"]),
) {}
