import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { ProgrammingLanguage } from "./programming-language.enum"

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "varchar",
    length: 128,
    nullable: false,
  })
  name: string

  @Column({
    type: "varchar",
    nullable: false,
    length: 64,
  })
  programmingLanguage: ProgrammingLanguage
}
