import { join } from "node:path"
import { Project } from "src/projects/project.entity"
import { DataSource } from "typeorm"
import { seedProjects } from "./seedProjects"
import { seedBugs } from "./seedBugs"
import { Bug } from "src/bugs/bug.entity"
import { User } from "src/users/user.entity"
import { seedUsers } from "./seedUsers"

async function seed() {
  const dataSource = new DataSource({
    type: "sqlite",
    database: join(__dirname, "..", "db.sqlite"),
    entities: [Project, Bug, User],
    synchronize: true,
  })

  await dataSource.initialize()

  await seedProjects(dataSource)
  await seedBugs(dataSource)
  await seedUsers(dataSource)

  console.log("Seeding complete!")
  await dataSource.destroy()
}

seed()
