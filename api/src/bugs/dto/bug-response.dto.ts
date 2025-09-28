import { Expose } from "class-transformer"
import { BugStatus } from "../enum/bug-status.enum"
import { BugPriority } from "../enum/bug-priority.enum"
import { BugReportSource } from "../enum/bug-report-source.enum"

export class BugResponseDto {
  @Expose()
  id: number

  @Expose()
  title: string

  @Expose()
  description: string | null

  @Expose()
  stack: string | null

  @Expose()
  attachmentUrl: string | null

  @Expose()
  reportedBy: BugReportSource

  @Expose()
  priority: BugPriority

  @Expose()
  status: BugStatus

  @Expose()
  resolvedAt: Date | null

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date
}
