import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"
import { BugReportSource } from "./enum/bug-report-source.enum"
import { BugPriority } from "./enum/bug-priority.enum"
import { BugStatus } from "./enum/bug-status.enum"

@Entity()
export class BugEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar" })
  title: string

  @Column({ type: "text", nullable: true })
  description: string | null

  @Column({ type: "text", nullable: true })
  stack: string | null

  @Column({ type: "varchar", nullable: true })
  attachmentUrl: string | null

  @Column({
    type: "simple-enum",
    enum: BugReportSource,
    default: BugReportSource.SYSTEM,
  })
  reportedBy: BugReportSource

  @Column({
    type: "simple-enum",
    enum: BugPriority,
    default: BugPriority.LOW,
  })
  priority: BugPriority

  @Column({
    type: "simple-enum",
    enum: BugStatus,
    default: BugStatus.OPEN,
  })
  status: BugStatus

  @Column({ type: "datetime", nullable: true })
  resolvedAt: Date | null

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // @ManyToOne(() => Project, (project) => project.bugs)
  // project: Project;
}
