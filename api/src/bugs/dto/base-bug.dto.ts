import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator"
import { BugReportSource } from "../enum/bug-report-source.enum"
import { BugPriority } from "../enum/bug-priority.enum"
import { BugStatus } from "../enum/bug-status.enum"

export class BaseBugDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  stack?: string

  @IsOptional()
  @IsUrl()
  attachmentUrl?: string

  @IsNotEmpty()
  @IsEnum(BugReportSource)
  reportedBy: BugReportSource

  @IsOptional()
  @IsEnum(BugPriority)
  priority?: BugPriority

  @IsOptional()
  @IsEnum(BugStatus)
  status?: BugStatus

  // @ManyToOne(() => Project, (project) => project.bugs)
  // project: Project;
}
