export declare class CategoryDto {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    addedById: number;
    parentCategoryId: number | null;
}
export declare class ProductList {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    addedById: number;
    reviewCount: number;
    avgRating: number;
    category: CategoryDto;
}
export declare class ProductsDto {
    totalProducts: number;
    limit: number;
    products: ProductList[];
}
