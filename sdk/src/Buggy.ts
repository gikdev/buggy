import {
  BugResponseDto,
  bugsControllerCreate,
  client,
  CreateBugDto,
} from "./api-client"
import { truncate } from "./utils"

type BugPriority = NonNullable<CreateBugDto["priority"]>

type CaptureReturn =
  | { state: "failed" }
  | { state: "skipped" }
  | { state: "succeeded"; bug: BugResponseDto }

type BuggyConfig = {
  /** Base URL of the Buggy API server */
  baseUrl: string

  /**
   * Whether to send the errors to API or not
   * Useful when you're in DEV mode & you're able to see all your errors...
   * @default true
   */
  sendErrors?: boolean
}

export class Buggy {
  private baseUrl: string
  private sendErrors: boolean

  constructor({ baseUrl, sendErrors = true }: BuggyConfig) {
    this.sendErrors = sendErrors

    if (baseUrl.endsWith("/"))
      throw new Error("Buggy's config.baseUrl should not end with `/`!")
    this.baseUrl = `${baseUrl}/api`
    client.setConfig({ baseUrl: this.baseUrl })
  }

  public async capture(
    thing: string | Error,
    priority?: BugPriority,
  ): Promise<CaptureReturn> {
    let body: CreateBugDto | null = null

    if (typeof thing === "string") {
      const title = truncate(thing, 30)
      const stack = new Error().stack

      body = {
        title,
        description: thing,
        priority,
        stack,
        reportedBy: "SYSTEM",
      }
    } else if (thing instanceof Error) {
      body = {
        title: thing.name,
        description: thing.message,
        stack: thing.stack,
        priority,
        reportedBy: "SYSTEM",
      }
    } else {
      throw new TypeError(
        "Buggy.capture's first arguments was neither `string` nor `Error`. Please pass an `string | Error`",
      )
    }

    if (!this.sendErrors) return { state: "failed" }

    const { data } = await bugsControllerCreate({
      body,
    })

    if (!data) return { state: "failed" }

    return { state: "succeeded", bug: data }
  }
}
