import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS
  app.enableCors();

  // Except errors
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const err = [];
        errors.forEach((e) => {
          const constraintsKeys = Object.keys(e.constraints);
          constraintsKeys.forEach((key) => {
            err.push({ field: e.property, message: e.constraints[key] });
          });
        });
        throw new BadRequestException(err);
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Incubator exams')
    .setDescription('Incubator exams API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Listen app
  await app.listen(PORT);
}

bootstrap();
