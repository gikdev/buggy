import { Module } from "@nestjs/common"
import { BugsService } from "./bugs.service"
import { BugsController } from "./bugs.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { BugEntity } from "./bug.entity"

const typeOrmForFeature = TypeOrmModule.forFeature([BugEntity])

@Module({
  imports: [typeOrmForFeature],
  controllers: [BugsController],
  providers: [BugsService],
})
export class BugsModule {}
