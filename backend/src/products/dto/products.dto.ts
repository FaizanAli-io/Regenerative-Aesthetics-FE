import {
  Expose,
  Transform,
  Type,
} from 'class-transformer';

export class ProductsDto {
  @Expose()
  totalProducts: number;

  @Expose()
  limit: number;

  @Expose()
  @Type(() => ProductList)
  products: ProductList[];
}

export class ProductList {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  stock: number;

  @Expose()
  @Transform(({ value }) =>
    value.toString().split(','),
  ) // Convert string paths to an array
  images: string[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  addedById: number;

  @Expose()
  reviewCount: number;

  @Expose()
  avgRating: number;

  @Expose()
  @Transform(({ obj }) => ({
    id: obj.categoryId,
    title: obj.categoryTitle,
    description: obj.categoryDescription,
    createdAt: obj.categoryCreatedAt,
    updatedAt: obj.categoryUpdatedAt,
    addedById: obj.categoryAddedById,
    parentCategoryId: obj.categoryParentId,
  }))
  category: any;
}
