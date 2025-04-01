import { Exclude } from 'class-transformer';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { Roles } from 'src/utility/common/user-roles.enum';
import { WishlistItemEntity } from 'src/wishlists/entities/wishlists-items.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Roles,
    array: true,
    default: [Roles.USER],
    enumName: 'user_role_enum',
  })
  roles: Roles[];

  @Column({ default: false })
  isVerified: boolean;

  @Exclude()
  @Column({ nullable: true })
  verificationToken: string;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  verificationTokenExpires: Date;

  @CreateDateColumn()
  createdAt: Timestamp;
  @UpdateDateColumn()
  updatedAt: Timestamp;

  @OneToMany(
    () => CategoryEntity,
    (cat) => cat.addedBy,
  )
  categories: CategoryEntity[];

  @OneToMany(
    () => ProductEntity,
    (prod) => prod.addedBy,
  )
  products: ProductEntity[];

  @OneToMany(
    (type) => ReviewEntity,
    (rev) => rev.user,
  )
  reviews: ReviewEntity[];

  @OneToMany(
    (type) => OrderEntity,
    (order) => order.updatedBy,
  )
  ordersUpdateBy: OrderEntity[];

  @OneToMany(
    () => OrderEntity,
    (order) => order.user,
  )
  orders: OrderEntity[];

  @OneToMany(
    () => WishlistItemEntity,
    (wishlistItem) => wishlistItem.user,
  )
  wishlistItems: WishlistItemEntity[];
}
