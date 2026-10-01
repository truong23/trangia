import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

async function runSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const { SeedService } = await import('./seed.service');
  const seedService = app.get(SeedService);
  await seedService.seedData();
  console.log('Seed executed successfully through Nest Application Context!');
  await app.close();
}

runSeed().catch((err) => {
  console.error('Failed to seed:', err);
  process.exit(1);
});
