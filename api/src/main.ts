import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { apiReference } from "@scalar/nestjs-api-reference"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { NestExpressApplication } from "@nestjs/platform-express"
import { join } from "node:path"
import hbs from "hbs"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  addGlobalValidation(app)
  enableCORS(app)
  configApiDocs(app)
  configMvcWithHbs(app)

  app.setGlobalPrefix("api")

  await app.listen(process.env.PORT ?? 3001)
}
bootstrap()

function addGlobalValidation(app: NestExpressApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
}

function enableCORS(app: NestExpressApplication) {
  // Enable CORS for all origins, all methods, all headers
  app.enableCors({
    origin: "*", // allow requests from any origin
    methods: "*", // allow all HTTP methods (GET, POST, etc.)
    allowedHeaders: "*", // allow all headers
  })
}

function configApiDocs(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle("Buggy API")
    .addServer("http://localhost:3001/api")
    .setVersion("1.0")
    // .addBearerAuth(
    //   {
    //     type: "http",
    //     scheme: "bearer",
    //     bearerFormat: "JWT",
    //     name: "JWT",
    //     description: "Enter JWT token",
    //     in: "header",
    //   },
    //   "bearer", // 🔑 This name matches @ApiBearerAuth("bearer") in controller
    // )
    .build()
  const doc = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup("docs/swagger", app, doc, {
    jsonDocumentUrl: "docs/swagger/json",
  })

  app.use(
    "/docs/scalar",
    apiReference({
      content: doc,
      // authentication: {
      //   preferredSecurityScheme: "bearer",
      // },
      theme: "fastify",
      layout: "modern",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
    }),
  )
}

function configMvcWithHbs(app: NestExpressApplication) {
  app.useStaticAssets(join(__dirname, "..", "..", "public"))
  app.setBaseViewsDir(join(__dirname, "..", "..", "views"))
  app.setViewEngine("hbs")

  hbs.registerHelper("priorityClass", function (priority: string) {
    switch (priority) {
      case "CRITICAL":
        return "danger"
      case "HIGH":
        return "warning"
      case "MEDIUM":
        return "info"
      case "LOW":
        return "success"
      default:
        return "secondary"
    }
  })
}
