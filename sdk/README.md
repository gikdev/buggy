# Buggy SDK

> A lightweight TypeScript SDK to capture errors and bugs in your projects, sending them to a central Buggy API. Works on frontend and backend.

---

## Features

* Capture both **Error objects** and **plain string messages**.
* Automatically captures **stack traces** for strings and errors.
* Supports **priority levels**: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`.
* Optional **dev mode**: skip sending errors to the backend.
* Fully typed and easy to integrate.

---

## Installation

```bash
npm install @gikdev/buggy-sdk
```

---

## Usage

### Basic Setup

```ts
import { Buggy } from "@gikdev/buggy-sdk";

const buggy = new Buggy({
  baseUrl: "http://localhost:3000", // should point to the running API URL
  sendErrors: true, // optional, defaults to true
});
```

### Capture a message

```ts
const result = await buggy.capture("Something went wrong", "HIGH");

if (result.state === "succeeded") {
  console.log("Bug sent successfully:", result.bug);
} else if (result.state === "failed") {
  console.warn("Bug sending failed");
} else if (result.state === "skipped") {
  console.log("Bug sending skipped (dev mode)");
}
```

### Capture an error

```ts
try {
  throw new Error("Critical failure");
} catch (err) {
  const result = await buggy.capture(err, "CRITICAL");
  console.log(result);
}
```

---

## API

### `new Buggy(config: BuggyConfig)`

* `baseUrl` (string, required) — The base URL of your Buggy API server.
* `sendErrors` (boolean, optional) — Whether to send errors to the server. Defaults to `true`.

### `capture(thing: string | Error, priority?: BugPriority): Promise<CaptureReturn>`

* `thing` — A string message or an Error object.
* `priority` — Optional severity level (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).
* Returns a `CaptureReturn` object:

  * `{ state: "succeeded", bug }` — bug was successfully sent
  * `{ state: "failed" }` — sending failed
  * `{ state: "skipped" }` — sending skipped (e.g., dev mode)
