import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "./user.entity"
import { Repository } from "typeorm"
import { ReplaceUserDto } from "./dto/replace-user.dto"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepo.create(createUserDto)

    await this.usersRepo.save(newUser)

    return newUser
  }

  async findAll() {
    const users = await this.usersRepo.find()

    return users
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } })

    if (!user) throw new NotFoundException(`User with ID: ${id} was not found.`)

    return user
  }

  async findOneByIdOrNull(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } })

    return user
  }

  async findOneByEmailOrNull(email: string) {
    const user = await this.usersRepo.findOne({ where: { email } })

    return user
  }

  async findOneByUsernameOrNull(username: string) {
    const user = await this.usersRepo.findOne({ where: { username } })

    return user
  }

  async replace(id: number, replaceUserDto: ReplaceUserDto) {
    const user = await this.findOne(id)

    user.name = replaceUserDto.name

    await this.usersRepo.save(user)

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)

    if (updateUserDto.name) user.name = updateUserDto.name

    await this.usersRepo.save(user)

    return user
  }

  async remove(id: number) {
    const user = await this.findOne(id)

    await this.usersRepo.remove(user)

    return user
  }
}
