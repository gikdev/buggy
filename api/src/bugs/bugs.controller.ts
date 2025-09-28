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
import { BugsService } from "./bugs.service"
import { CreateBugDto } from "./dto/create-bug.dto"
import { UpdateBugDto } from "./dto/update-bug.dto"
import { ReplaceBugDto } from "./dto/replace-bug.dto"

@Controller("bugs")
export class BugsController {
  constructor(private readonly bugsService: BugsService) {}

  @Post()
  create(@Body() createBugDto: CreateBugDto) {
    return this.bugsService.create(createBugDto)
  }

  @Get()
  findAll() {
    return this.bugsService.findAll()
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.bugsService.findOne(id)
  }

  @Put(":id")
  replace(
    @Param("id", ParseIntPipe) id: number,
    @Body() replaceBugDto: ReplaceBugDto,
  ) {
    return this.bugsService.replace(id, replaceBugDto)
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBugDto: UpdateBugDto,
  ) {
    return this.bugsService.update(id, updateBugDto)
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.bugsService.remove(id)
  }
}
