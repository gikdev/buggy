import { Module } from "@nestjs/common"
import { ProjectsModule } from "./projects/projects.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { join } from "node:path"

const typeOrmModule = TypeOrmModule.forRootAsync({
  imports: [],
  inject: [],
  useFactory: () => ({
    type: "sqlite",
    synchronize: true,
    autoLoadEntities: true,
    database: join(__dirname, "..", "db.sqlite"),
  }),
})

@Module({
  imports: [ProjectsModule, typeOrmModule],
})
export class AppModule {}
