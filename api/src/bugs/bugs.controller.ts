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
  Render,
} from "@nestjs/common"
import { BugsService } from "./bugs.service"
import { CreateBugDto } from "./dto/create-bug.dto"
import { UpdateBugDto } from "./dto/update-bug.dto"
import { ReplaceBugDto } from "./dto/replace-bug.dto"
import { plainToInstance } from "class-transformer"
import { BugResponseDto } from "./dto/bug-response.dto"
import { ApiOperation } from "@nestjs/swagger"
import { defaultInstanceOptions } from "src/shared/dto"

@Controller("bugs")
export class BugsController {
  constructor(private readonly bugsService: BugsService) {}

  @Get("view-all")
  @Render("bugs")
  async veiwAll() {
    const bugs = await this.bugsService.findAll()

    return {
      bugs: plainToInstance(BugResponseDto, bugs, defaultInstanceOptions),
    }
  }

  @ApiOperation({ summary: "Create a bug" })
  @Post()
  async create(@Body() createBugDto: CreateBugDto) {
    const bug = await this.bugsService.create(createBugDto)

    return plainToInstance(BugResponseDto, bug, defaultInstanceOptions)
  }

  @ApiOperation({ summary: "Get all bugs" })
  @Get()
  async findAll() {
    const bugs = await this.bugsService.findAll()

    return plainToInstance(BugResponseDto, bugs, defaultInstanceOptions)
  }

  @ApiOperation({ summary: "Get a bug by ID" })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    const bug = this.bugsService.findOne(id)

    return plainToInstance(BugResponseDto, bug, defaultInstanceOptions)
  }

  @ApiOperation({ summary: "Replace a bug by ID" })
  @Put(":id")
  async replace(
    @Param("id", ParseIntPipe) id: number,
    @Body() replaceBugDto: ReplaceBugDto,
  ) {
    const bug = await this.bugsService.replace(id, replaceBugDto)

    return plainToInstance(BugResponseDto, bug, defaultInstanceOptions)
  }

  @ApiOperation({ summary: "Update a bug by ID" })
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBugDto: UpdateBugDto,
  ) {
    const bug = await this.bugsService.update(id, updateBugDto)

    return plainToInstance(BugResponseDto, bug, defaultInstanceOptions)
  }

  @ApiOperation({ summary: "Delete a bug by ID" })
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    const bug = await this.bugsService.remove(id)

    return plainToInstance(BugResponseDto, bug, defaultInstanceOptions)
  }
}
