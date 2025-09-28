import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateProjectDto } from "./dto/create-project.dto"
import { UpdateProjectDto } from "./dto/update-project.dto"
import { Project } from "./project.entity"
import { ProgrammingLanguage } from "./programming-language.enum"
import { ReplaceProjectDto } from "./dto/replace-project.dto"

@Injectable()
export class ProjectsService {
  projects: Project[] = [
    {
      id: 0,
      name: "Buggy",
      programmingLanguage: ProgrammingLanguage.TypeScript,
    },
  ]

  create(createProjectDto: CreateProjectDto) {
    const newProject: Project = {
      id: this.projects.length,
      name: createProjectDto.name,
      programmingLanguage: createProjectDto.programmingLanguage,
    }

    this.projects.push(newProject)

    return newProject
  }

  findAll() {
    return this.projects
  }

  findOne(id: number) {
    const project = this.projects.find(p => p.id === id)

    if (!project)
      throw new NotFoundException(`Project with ID: ${id} was not found!`)

    return project
  }

  replace(id: number, replaceProjectDto: ReplaceProjectDto) {
    const projectToReplace = this.findOne(id)

    // Replacing...
    projectToReplace.name = replaceProjectDto.name
    projectToReplace.programmingLanguage = replaceProjectDto.programmingLanguage

    return projectToReplace
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    const projectToUpdate = this.findOne(id)

    // Updating...
    if (updateProjectDto.name !== undefined)
      projectToUpdate.name = updateProjectDto.name
    if (updateProjectDto.programmingLanguage !== undefined)
      projectToUpdate.programmingLanguage = updateProjectDto.programmingLanguage

    return projectToUpdate
  }

  remove(id: number) {
    const index = this.projects.findIndex(p => p.id === id)

    if (index === -1)
      throw new NotFoundException(`Project with ID: ${id} was not found!`)

    const [removed] = this.projects.splice(index, 1)

    return removed
  }
}
