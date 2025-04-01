// src/wishlists/entities/wishlist-item.entity.ts
import { ProductEntity } from 'src/products/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('wishlist_items')
export class WishlistItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(
    () => UserEntity,
    (user) => user.wishlistItems,
  )
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => ProductEntity)
  @JoinColumn()
  product: ProductEntity;
}
