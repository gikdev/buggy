import { Bug } from "src/bugs/bug.entity"
import { BugPriority } from "src/bugs/enum/bug-priority.enum"
import { BugReportSource } from "src/bugs/enum/bug-report-source.enum"
import { BugStatus } from "src/bugs/enum/bug-status.enum"
import { DataSource } from "typeorm"

export async function seedBugs(dataSource: DataSource) {
  const repo = dataSource.getRepository(Bug)

  const bugs: Omit<Bug, "id" | "createdAt" | "updatedAt">[] = [
    {
      title: "Login page not responsive",
      reportedBy: BugReportSource.FORM,
      description: "On mobile devices, the login form overflows outside the screen.",
      stack: null,
      attachmentUrl: "https://example.com/screenshots/login-mobile.png",
      priority: BugPriority.MEDIUM,
      status: BugStatus.OPEN,
      resolvedAt: null,
    },
    {
      title: "Memory leak in report generator",
      reportedBy: BugReportSource.SYSTEM,
      description: "Server memory usage grows indefinitely when generating reports.",
      stack: "Heap out of memory\n    at ReportService.generate (/src/report/service.ts:120:19)",
      attachmentUrl: null,
      priority: BugPriority.CRITICAL,
      status: BugStatus.OPEN,
      resolvedAt: null,
    },
    {
      title: "Third-party auth failure",
      reportedBy: BugReportSource.THRID_PARTY,
      description: "Google login intermittently fails due to expired OAuth tokens.",
      stack: null,
      attachmentUrl: null,
      priority: BugPriority.HIGH,
      status: BugStatus.IN_PROGRESS,
      resolvedAt: null,
    },
    {
      title: "Notifications not delivered",
      reportedBy: BugReportSource.SYSTEM,
      description: "Push notifications are not reaching iOS devices.",
      stack: null,
      attachmentUrl: "https://example.com/screenshots/ios-notifs.png",
      priority: BugPriority.HIGH,
      status: BugStatus.OPEN,
      resolvedAt: null,
    },
    {
      title: "Broken image on homepage",
      reportedBy: BugReportSource.FORM,
      description: "Hero image doesn’t load due to incorrect path.",
      stack: null,
      attachmentUrl: null,
      priority: BugPriority.LOW,
      status: BugStatus.RESOLVED,
      resolvedAt: new Date(),
    },
    {
      title: "UI freezes when uploading large file",
      reportedBy: BugReportSource.FORM,
      description: "Uploading files >500MB causes the app to become unresponsive.",
      stack: null,
      attachmentUrl: null,
      priority: BugPriority.HIGH,
      status: BugStatus.OPEN,
      resolvedAt: null,
    },
    {
      title: "Email service down",
      reportedBy: BugReportSource.SYSTEM,
      description: "SMTP server not reachable — emails are not being sent.",
      stack: null,
      attachmentUrl: null,
      priority: BugPriority.CRITICAL,
      status: BugStatus.OPEN,
      resolvedAt: null,
    },
    {
      title: "UI glitch in dark mode",
      reportedBy: BugReportSource.FORM,
      description: "Buttons remain white instead of adapting to dark theme.",
      stack: null,
      attachmentUrl: "https://example.com/screenshots/darkmode-bug.png",
      priority: BugPriority.MEDIUM,
      status: BugStatus.RESOLVED,
      resolvedAt: new Date(),
    },
  ]

  for (const b of bugs) {
    const bug = repo.create(b)
    await repo.save(bug)
  }
}
