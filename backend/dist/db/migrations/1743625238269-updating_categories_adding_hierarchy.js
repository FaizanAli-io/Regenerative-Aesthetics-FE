"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatingCategoriesAddingHierarchy1743625238269 = void 0;
class UpdatingCategoriesAddingHierarchy1743625238269 {
    name = 'UpdatingCategoriesAddingHierarchy1743625238269';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "categories" ADD "parentCategoryId" integer`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_ccde635bce518afe7c110858cc4" FOREIGN KEY ("parentCategoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_ccde635bce518afe7c110858cc4"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "parentCategoryId"`);
    }
}
exports.UpdatingCategoriesAddingHierarchy1743625238269 = UpdatingCategoriesAddingHierarchy1743625238269;
//# sourceMappingURL=1743625238269-updating_categories_adding_hierarchy.js.map