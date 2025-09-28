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
export class Bug {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ type: "text", nullable: true })
  description: string

  @Column({ type: "text", nullable: true })
  stack: string

  @Column({ nullable: true })
  attachmentUrl: string

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
