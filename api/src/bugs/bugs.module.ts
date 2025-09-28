import { Module } from "@nestjs/common"
import { BugsService } from "./bugs.service"
import { BugsController } from "./bugs.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Bug } from "./bug.entity"

const typeOrmForFeature = TypeOrmModule.forFeature([Bug])

@Module({
  imports: [typeOrmForFeature],
  controllers: [BugsController],
  providers: [BugsService],
})
export class BugsModule {}
