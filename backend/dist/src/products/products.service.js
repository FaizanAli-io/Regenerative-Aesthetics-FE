"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const order_status_enum_1 = require("./../orders/enum/order-status.enum");
const orders_service_1 = require("./../orders/orders.service");
const categories_service_1 = require("./../categories/categories.service");
const data_source_1 = require("./../../db/data-source");
let ProductsService = class ProductsService {
    productRepository;
    categoryService;
    orderService;
    constructor(productRepository, categoryService, orderService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
        this.orderService = orderService;
    }
    async create(createProductDto, currentUser) {
        const category = await this.categoryService.findOne(+createProductDto.categoryId);
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        const product = this.productRepository.create(createProductDto);
        product.category = category;
        product.addedBy = currentUser;
        return await this.productRepository.save(product);
    }
    async findAll(query) {
        let limit = query.limit ? query.limit : 10;
        const queryBuilder = data_source_1.default
            .getRepository(product_entity_1.ProductEntity)
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoin('product.reviews', 'review')
            .select([
            'product.id AS "id"',
            'product.title AS "title"',
            'product.description AS "description"',
            'product.price AS "price"',
            'product.stock AS "stock"',
            'product.images AS "images"',
            'product.createdAt AS "createdAt"',
            'product.updatedAt AS "updatedAt"',
            'product.addedById AS "addedById"',
            'category.id AS "categoryId"',
            'category.title AS "categoryTitle"',
            'category.description AS "categoryDescription"',
            'category.createdAt AS "categoryCreatedAt"',
            'category.updatedAt AS "categoryUpdatedAt"',
            'category.addedById AS "categoryAddedById"',
            'category.parentCategoryId AS "categoryParentId"',
            'COUNT(review.id) AS "reviewCount"',
            'AVG(review.ratings)::numeric(10,2) AS "avgRating"',
        ])
            .groupBy('product.id, category.id');
        const totalProducts = await queryBuilder.getCount();
        if (query.category) {
            const categoryIds = await this.categoryService.getCategoryAndChildrenIds(query.category);
            queryBuilder.andWhere('category.id IN (:...ids)', {
                ids: categoryIds,
            });
        }
        if (query.search) {
            queryBuilder.andWhere('product.title LIKE :title', {
                title: `%${query.search}%`,
            });
        }
        if (query.minPrice) {
            queryBuilder.andWhere('product.price >= :minPrice', {
                minPrice: query.minPrice,
            });
        }
        if (query.maxPrice) {
            queryBuilder.andWhere('product.price <= :maxPrice', {
                maxPrice: query.maxPrice,
            });
        }
        if (query.minRating) {
            queryBuilder.andHaving('AVG(review.ratings) >= :minRating', {
                minRating: query.minRating,
            });
        }
        if (query.maxRating) {
            queryBuilder.andHaving('AVG(review.ratings) <= :maxRating', {
                maxRating: query.maxRating,
            });
        }
        queryBuilder.limit(limit);
        if (query.offset) {
            queryBuilder.offset(query.offset);
        }
        const products = await queryBuilder.getRawMany();
        console.log(products);
        const formattedProducts = products.map((product) => {
            console.log('Product before formatting:', product);
            return {
                id: product.id,
                title: product.title,
                description: product.description,
                price: parseFloat(product.price),
                stock: product.stock,
                images: product.images
                    ? product.images.split(',')
                    : [],
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                addedById: product.addedById,
                reviewCount: parseInt(product.reviewCount, 10),
                avgRating: product.avgRating
                    ? parseFloat(product.avgRating)
                    : null,
                category: product.categoryId
                    ? {
                        id: product.categoryId,
                        title: product.categoryTitle,
                        description: product.categoryDescription,
                        createdAt: product.categoryCreatedAt,
                        updatedAt: product.categoryUpdatedAt,
                        addedById: product.categoryAddedById,
                        parentCategoryId: product.categoryParentId,
                    }
                    : null,
            };
        });
        console.log('Formatted Products:', formattedProducts);
        return {
            totalProducts,
            limit,
            products: formattedProducts,
        };
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: { id: id },
            relations: {
                addedBy: true,
                category: true,
            },
            select: {
                addedBy: {
                    id: true,
                    name: true,
                    email: true,
                },
                category: {
                    id: true,
                    title: true,
                    description: true,
                },
            },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found.');
        return product;
    }
    async update(id, fields, currentUser) {
        const product = await this.findOne(id);
        Object.assign(product, fields);
        product.addedBy = currentUser;
        if (fields.categoryId) {
            const category = await this.categoryService.findOne(+fields.categoryId);
            if (!category)
                throw new common_1.NotFoundException('Category not found');
            product.category = category;
        }
        return await this.productRepository.save(product);
    }
    async remove(id) {
        const product = await this.findOne(id);
        const order = await this.orderService.findOneByProductId(product.id);
        if (order)
            throw new common_1.BadRequestException('Products is in use.');
        return await this.productRepository.remove(product);
    }
    async updateStock(id, stock, status) {
        let product = await this.findOne(id);
        if (status === order_status_enum_1.OrderStatus.DELIVERED) {
            product.stock -= stock;
        }
        else {
            product.stock += stock;
        }
        product =
            await this.productRepository.save(product);
        return product;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(product_entity_1.ProductEntity)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => orders_service_1.OrdersService))),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        categories_service_1.CategoriesService,
        orders_service_1.OrdersService])
], ProductsService);
//# sourceMappingURL=products.service.js.map