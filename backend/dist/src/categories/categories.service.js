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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entities/category.entity");
const typeorm_2 = require("typeorm");
let CategoriesService = class CategoriesService {
    categoryRepository;
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(createCategoryDto, currentUser) {
        let parentCategory = null;
        if (createCategoryDto.parentCategoryId) {
            parentCategory = await this.findOne(createCategoryDto.parentCategoryId);
        }
        const category = new category_entity_1.CategoryEntity();
        category.title = createCategoryDto.title;
        category.description =
            createCategoryDto.description;
        category.addedBy = currentUser;
        if (parentCategory) {
            category.parentCategory = parentCategory;
        }
        return await this.categoryRepository.save(category);
    }
    async findAll() {
        const categories = await this.categoryRepository.find({
            where: {
                parentCategory: (0, typeorm_2.IsNull)(),
            },
            relations: ['children'],
        });
        return this.buildCategoryTree(categories);
    }
    buildCategoryTree(categories) {
        categories.forEach((category) => {
            if (category.children?.length) {
                category.children =
                    this.buildCategoryTree(category.children);
            }
        });
        return categories;
    }
    async getCategoryAndChildrenIds(categoryId) {
        const category = await this.findOne(categoryId);
        const childIds = category.children
            ? category.children.map((child) => child.id)
            : [];
        for (const child of category.children) {
            const grandChildIds = await this.getCategoryAndChildrenIds(child.id);
            childIds.push(...grandChildIds);
        }
        return [categoryId, ...childIds];
    }
    async findOne(id) {
        const category = await this.categoryRepository.findOne({
            where: { id: id },
            relations: ['parentCategory', 'children'],
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found.');
        }
        return category;
    }
    async update(id, fields) {
        const category = await this.findOne(id);
        if (fields.parentCategoryId !== undefined) {
            if (fields.parentCategoryId === null) {
                category.parentCategory = null;
            }
            else {
                if (fields.parentCategoryId === id) {
                    throw new common_1.BadRequestException('A category cannot be its own parent.');
                }
                const parentCategory = await this.categoryRepository.findOne({
                    where: {
                        id: fields.parentCategoryId,
                    },
                    relations: ['parentCategory'],
                });
                if (!parentCategory) {
                    throw new common_1.NotFoundException('Parent category not found.');
                }
                let currentParent = parentCategory;
                while (currentParent) {
                    if (currentParent.id === id) {
                        throw new common_1.BadRequestException('Circular category hierarchy is not allowed.');
                    }
                    currentParent =
                        currentParent.parentCategory ?? null;
                }
                category.parentCategory = parentCategory;
            }
        }
        Object.assign(category, fields);
        return await this.categoryRepository.save(category);
    }
    async remove(id) {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Category not found');
        }
        return result;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map