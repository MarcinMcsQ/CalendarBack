import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { GlobalExceptionFilter } from "./filters/global-exception.filter";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import { CONFIG_PRIV } from "../config/config";
import { useContainer } from "class-validator";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    },

  }));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // app.use(
  //   cors({
  //     origin: CONFIG_PRIV.cors.ORIGIN,
  //     credentials: true
  //   })
  // );
  app.enableCors({
    origin:CONFIG_PRIV.cors.ORIGIN,
    credentials:true
  });
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.use(cookieParser());
  await app.listen(3001);
}

bootstrap();
