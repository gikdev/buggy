import { PickType } from "@nestjs/swagger"
import { BaseUserDto } from "./base-user.dto"

export class ReplaceUserDto extends PickType(BaseUserDto, ["name"]) {}
