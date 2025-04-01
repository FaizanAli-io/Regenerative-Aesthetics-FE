// src/wishlists/wishlists.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';
import { WishlistItemEntity } from './entities/wishlists-items.entity';
import { ProductsModule } from '../products/products.module'; // Add this

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WishlistItemEntity,
    ]),
    ProductsModule, // Add this line
  ],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
