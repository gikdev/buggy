import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from "@nestjs/common"
import { ProjectsService } from "./projects.service"
import { CreateProjectDto } from "./dto/create-project.dto"
import { UpdateProjectDto } from "./dto/update-project.dto"
import { plainToInstance } from "class-transformer"
import { ProjectResponseDto } from "./dto/project-response.dto"
import { ReplaceProjectDto } from "./dto/replace-project.dto"
import { ApiOperation } from "@nestjs/swagger"
import { defaultInstanceOptions } from "src/shared/dto"

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: "Create a new project" })
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    const newProject = this.projectsService.create(createProjectDto)

    return plainToInstance(
      ProjectResponseDto,
      newProject,
      defaultInstanceOptions,
    )
  }

  @ApiOperation({ summary: "Get all projects" })
  @Get()
  findAll() {
    const projects = this.projectsService.findAll()

    return plainToInstance(ProjectResponseDto, projects, defaultInstanceOptions)
  }

  @ApiOperation({ summary: "Get a project by ID" })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    const project = this.projectsService.findOne(id)

    return plainToInstance(ProjectResponseDto, project, defaultInstanceOptions)
  }

  @ApiOperation({ summary: "Replace a project by ID" })
  @Put(":id")
  replace(
    @Param("id", ParseIntPipe) id: number,
    @Body() replaceProjectDto: ReplaceProjectDto,
  ) {
    const replacedProject = this.projectsService.replace(id, replaceProjectDto)

    return plainToInstance(
      ProjectResponseDto,
      replacedProject,
      defaultInstanceOptions,
    )
  }

  @ApiOperation({ summary: "Update a project by ID" })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const updatedProject = this.projectsService.update(id, updateProjectDto)

    return plainToInstance(
      ProjectResponseDto,
      updatedProject,
      defaultInstanceOptions,
    )
  }

  @ApiOperation({ summary: "Delete a project by ID" })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    const removedProject = this.projectsService.remove(id)

    return plainToInstance(
      ProjectResponseDto,
      removedProject,
      defaultInstanceOptions,
    )
  }
}
