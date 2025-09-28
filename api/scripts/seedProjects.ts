import { ProgrammingLanguage } from "src/projects/programming-language.enum"
import { ProjectEntity } from "src/projects/project.entity"
import { DataSource } from "typeorm"

export async function seedProjects(dataSource:DataSource) {
  const repo = dataSource.getRepository(ProjectEntity)

  const projects: Pick<ProjectEntity, "name" | "programmingLanguage">[] = [
    {
      name: "Buggy API",
      programmingLanguage: ProgrammingLanguage.TypeScript,
    },
    {
      name: "Buggy SDK",
      programmingLanguage: ProgrammingLanguage.TypeScript,
    },
    {
      name: "بک‌اند آی‌آر زر",
      programmingLanguage: ProgrammingLanguage.CSharp,
    },
    {
      name: "آی‌آر زر: وب‌اپ",
      programmingLanguage: ProgrammingLanguage.TypeScript,
    },
  ]

  for (const p of projects) {
    const project = repo.create(p)
    await repo.save(project)
  }
}
