import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  input: `http://localhost:3000/docs/swagger/json`,
  output: "src/api-client",
  plugins: [
    { name: "@hey-api/client-fetch", exportFromIndex: true },
    { name: "@hey-api/typescript", enums: "javascript" },
    { name: "@hey-api/sdk" },
  ],
})
