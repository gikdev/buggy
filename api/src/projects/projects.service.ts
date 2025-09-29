import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateProjectDto } from "./dto/create-project.dto"
import { UpdateProjectDto } from "./dto/update-project.dto"
import { Project } from "./project.entity"
import { ReplaceProjectDto } from "./dto/replace-project.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const newProject = this.projectRepo.create(createProjectDto)

    await this.projectRepo.save(newProject)

    return newProject
  }

  async findAll() {
    const projects = await this.projectRepo.find()

    return projects
  }

  async findOne(id: number) {
    const project = await this.projectRepo.findOne({
      where: { id },
    })

    if (!project)
      throw new NotFoundException(`Project with ID: ${id} was not found!`)

    return project
  }

  async replace(id: number, replaceProjectDto: ReplaceProjectDto) {
    const projectToReplace = await this.findOne(id)

    // Replacing...
    projectToReplace.name = replaceProjectDto.name
    projectToReplace.programmingLanguage = replaceProjectDto.programmingLanguage

    await this.projectRepo.save(projectToReplace)

    return projectToReplace
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const projectToUpdate = await this.findOne(id)

    // Updating...
    if (updateProjectDto.name !== undefined)
      projectToUpdate.name = updateProjectDto.name
    if (updateProjectDto.programmingLanguage !== undefined)
      projectToUpdate.programmingLanguage = updateProjectDto.programmingLanguage

    await this.projectRepo.save(projectToUpdate)

    return projectToUpdate
  }

  async remove(id: number) {
    const projectToRemove = await this.findOne(id)

    await this.projectRepo.remove(projectToRemove)

    return projectToRemove
  }
}
