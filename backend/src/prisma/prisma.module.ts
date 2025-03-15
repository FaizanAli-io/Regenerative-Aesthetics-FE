import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Makes PrismaService available across all modules
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Important! Allows other modules to use PrismaService
})
export class PrismaModule {}
