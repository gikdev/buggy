import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common"
import { UsersService } from "./users.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { ReplaceUserDto } from "./dto/replace-user.dto"
import { ApiOperation } from "@nestjs/swagger"
import { plainToInstance } from "class-transformer"
import { UserResponseDto } from "./dto/user-response.dto"
import { defaultInstanceOptions } from "src/shared/dto"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Create a user" })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)

    return plainToInstance(UserResponseDto, user, defaultInstanceOptions)
  }

  @ApiOperation({ summary: "Get all users" })
  @Get()
  async findAll() {
    const users = await this.usersService.findAll()

    return plainToInstance(UserResponseDto, users, defaultInstanceOptions)
  }

  @ApiOperation({ summary: "Get a user by ID" })
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id)

    return plainToInstance(UserResponseDto, user, defaultInstanceOptions)
  }

  @ApiOperation({ summary: "Replace a user by ID" })
  @Patch(":id")
  async replace(
    @Param("id", ParseIntPipe) id: number,
    @Body() replaceUserDto: ReplaceUserDto,
  ) {
    const user = await this.usersService.replace(id, replaceUserDto)

    return plainToInstance(UserResponseDto, user, defaultInstanceOptions)
  }

  @ApiOperation({ summary: "Update a user by ID" })
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, updateUserDto)

    return plainToInstance(UserResponseDto, user, defaultInstanceOptions)
  }

  @ApiOperation({ summary: "Delete a user by ID" })
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    const user = await this.usersService.remove(id)

    return plainToInstance(UserResponseDto, user, defaultInstanceOptions)
  }
}
