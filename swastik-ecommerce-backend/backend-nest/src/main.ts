// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3000; // Use PORT environment variable if available, otherwise default to 3000
    await app.listen(port);
    // console.log(`Application is running on port ${port}`);
  } catch (error) {
    console.error('Error starting the application:', error);
  }
}

bootstrap();
