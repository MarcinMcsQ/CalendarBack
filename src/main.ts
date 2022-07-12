import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { GlobalExceptionFilter } from "./filters/global-exception.filter";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import { CONFIG_PRIV } from "../config/config";
import { useContainer, ValidationError } from "class-validator";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    //wyłącza szczegułowe błędy w środowisku produkcyjnym
    disableErrorMessages: false,
    //nasze DTO jest ałtomatycznie spradzane na wejściu od urzytkownika
    //pilnujemuy żeby typy w DTO były dokładnie tm co chcemy otrzymywać!!!
    whitelist: true,
    //odrzuca wszystkie zmienne ktorych niema w DTO a mogły zostać dopisane
    forbidNonWhitelisted: true,
    //automatycznie rzutuje nam parametry na typ jaki podamy :) nie musza to byc już ciągłe stringi ale nie waliduje npm string zrzutuje na NaN i nie zgłosi błędu
    // forbidUnknownValues: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    },
    // exceptionFactory: (errors: ValidationError[]) => {
    //   return {elo:'elo'}
    // }

  }));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(
    cors({
      origin: CONFIG_PRIV.cors.ORIGIN,
      credentials: true
    })
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.use(cookieParser());
  await app.listen(3000);
}

bootstrap();
