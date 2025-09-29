import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateBugDto } from "./dto/create-bug.dto"
import { UpdateBugDto } from "./dto/update-bug.dto"
import { ReplaceBugDto } from "./dto/replace-bug.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { Bug } from "./bug.entity"
import { Repository } from "typeorm"
import { BugPriority } from "./enum/bug-priority.enum"
import { BugStatus } from "./enum/bug-status.enum"

@Injectable()
export class BugsService {
  constructor(
    @InjectRepository(Bug)
    private readonly bugRepo: Repository<Bug>,
  ) {}

  async findAll() {
    const bugs = await this.bugRepo.find()

    return bugs
  }

  async findOne(id: number) {
    const bug = await this.bugRepo.findOne({
      where: { id },
    })

    if (!bug) throw new NotFoundException(`Bug with ID: ${id} was not found.`)

    return bug
  }

  async create(createBugDto: CreateBugDto) {
    const newBug = this.bugRepo.create(createBugDto)

    await this.bugRepo.save(newBug)

    return newBug
  }

  async replace(id: number, replaceBugDto: ReplaceBugDto) {
    const bug = await this.findOne(id)

    bug.attachmentUrl = replaceBugDto.attachmentUrl ?? null
    bug.description = replaceBugDto.description ?? null
    bug.priority = replaceBugDto.priority ?? BugPriority.LOW
    bug.reportedBy = replaceBugDto.reportedBy
    bug.stack = replaceBugDto.stack ?? null
    bug.status = replaceBugDto.status ?? BugStatus.OPEN
    bug.title = replaceBugDto.title

    await this.bugRepo.save(bug)

    return bug
  }

  async update(id: number, updateBugDto: UpdateBugDto) {
    const bug = await this.findOne(id)

    if (updateBugDto.attachmentUrl !== undefined)
      bug.attachmentUrl = updateBugDto.attachmentUrl
    if (updateBugDto.description !== undefined)
      bug.description = updateBugDto.description
    if (updateBugDto.priority !== undefined)
      bug.priority = updateBugDto.priority
    if (updateBugDto.reportedBy !== undefined)
      bug.reportedBy = updateBugDto.reportedBy
    if (updateBugDto.stack !== undefined) bug.stack = updateBugDto.stack
    if (updateBugDto.status !== undefined) bug.status = updateBugDto.status
    if (updateBugDto.title !== undefined) bug.title = updateBugDto.title

    await this.bugRepo.save(bug)

    return bug
  }

  async remove(id: number) {
    const bug = await this.findOne(id)

    await this.bugRepo.remove(bug)

    return bug
  }
}
