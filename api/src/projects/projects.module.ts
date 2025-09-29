import { Module } from "@nestjs/common"
import { ProjectsService } from "./projects.service"
import { ProjectsController } from "./projects.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Project } from "./project.entity"

const typeOrmForFeature = TypeOrmModule.forFeature([Project])

@Module({
  imports: [typeOrmForFeature],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
