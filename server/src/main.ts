import { ConfigService } from './config/config.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(app.get(ConfigService).port);
}
bootstrap();
