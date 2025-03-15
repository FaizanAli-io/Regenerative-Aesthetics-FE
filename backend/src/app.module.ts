import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module'; // Import PrismaModule

@Module({
  imports: [UsersModule, PrismaModule], // Ensure PrismaModule is imported
})
export class AppModule {}
