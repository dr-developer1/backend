import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {UsersSeedService} from "./users/users-seed.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    const usersSeedService = app.get(UsersSeedService);
    await usersSeedService.createUser();
    await app.listen(3000);
}

bootstrap();
