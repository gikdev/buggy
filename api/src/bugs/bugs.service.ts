import { Injectable } from "@nestjs/common"
import { CreateBugDto } from "./dto/create-bug.dto"
import { UpdateBugDto } from "./dto/update-bug.dto"
import { ReplaceBugDto } from "./dto/replace-bug.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { Bug } from "./bug.entity"
import { Repository } from "typeorm"

@Injectable()
export class BugsService {
  constructor(
    @InjectRepository(Bug)
    private readonly bugRepo: Repository<Bug>,
  ) {}

  findAll() {
    return `This action returns all bugs`
  }

  findOne(id: number) {
    return `This action returns a #${id} bug`
  }

  async create(createBugDto: CreateBugDto) {
    const newBug = this.bugRepo.create(createBugDto)

    await this.bugRepo.save(newBug)

    return newBug
  }

  replace(id: number, replaceBugDto: ReplaceBugDto) {
    return `This action updates a #${id} bug`
  }

  update(id: number, updateBugDto: UpdateBugDto) {
    return `This action updates a #${id} bug`
  }

  remove(id: number) {
    return `This action removes a #${id} bug`
  }
}
