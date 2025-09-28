import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { apiReference } from "@scalar/nestjs-api-reference"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

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

  // Enable CORS for all origins, all methods, all headers
  app.enableCors({
    origin: "*", // allow requests from any origin
    methods: "*", // allow all HTTP methods (GET, POST, etc.)
    allowedHeaders: "*", // allow all headers
  })

  const config = new DocumentBuilder()
    .setTitle("Buggy API")
    .addServer("http://localhost:3000/api")
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

  app.setGlobalPrefix("api")

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
