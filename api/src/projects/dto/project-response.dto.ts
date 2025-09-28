import { Expose } from "class-transformer"
import { ProgrammingLanguage } from "../programming-language.enum"

export class ProjectResponseDto {
  @Expose()
  id: number

  @Expose()
  name: string

  @Expose()
  programmingLanguage: ProgrammingLanguage
}
