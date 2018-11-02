import { NestFactory, FastifyAdapter } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/httpException.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : AppModule.host;

  const swaggerOptions = new DocumentBuilder()
        .setTitle('API')
        .setDescription('API Documentation')
        .setVersion('1.0.0')
        .setHost(hostDomain.split('//')[1])
        .setSchemes(AppModule.isDev ? 'http' : 'https')
        .setBasePath('/api')
        .addBearerAuth('Authorization', 'header')
        .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

  app.use('/api/docs/swagger.json', (req, res) => {
    res.send(swaggerDoc);
  });

  SwaggerModule.setup('/api/docs', app, swaggerDoc);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(AppModule.port);
}
bootstrap();
