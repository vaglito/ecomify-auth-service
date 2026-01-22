import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe, Logger } from '@nestjs/common';
import { CustomRpcExceptionFilter } from './common/filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: parseInt(process.env.PORT || '3001'),
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomRpcExceptionFilter());

  const logger = new Logger('Auth-Microservice');
  await app.listen();
  logger.log('Auth Microservice is listening on port ' + (process.env.PORT || 3001));
}
bootstrap();
