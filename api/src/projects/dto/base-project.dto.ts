import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { ProgrammingLanguage } from "../programming-language.enum"

export class BaseProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEnum(ProgrammingLanguage)
  @IsNotEmpty()
  programmingLanguage: ProgrammingLanguage
}
