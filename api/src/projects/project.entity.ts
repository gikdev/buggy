import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { ProgrammingLanguage } from "./programming-language.enum"

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar" })
  name: string

  @Column({ type: "varchar" })
  programmingLanguage: ProgrammingLanguage

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
