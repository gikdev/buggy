import { join } from "node:path"
import { Project } from "src/projects/project.entity"
import { DataSource } from "typeorm"
import { seedProjects } from "./seedProjects"

async function seed() {
  const dataSource = new DataSource({
    type: "sqlite",
    database: join(__dirname, "..", "db.sqlite"),
    entities: [Project],
    synchronize: true,
  })

  await dataSource.initialize()

  await seedProjects(dataSource)

  console.log("Seeding complete!")
  await dataSource.destroy()
}

seed()
