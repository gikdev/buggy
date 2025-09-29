import { Module } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./user.entity"

const typeOrmForFeature = TypeOrmModule.forFeature([User])

@Module({
  imports: [typeOrmForFeature],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
