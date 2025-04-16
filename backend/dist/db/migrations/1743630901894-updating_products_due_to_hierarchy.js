"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatingProductsDueToHierarchy1743630901894 = void 0;
class UpdatingProductsDueToHierarchy1743630901894 {
    name = 'UpdatingProductsDueToHierarchy1743630901894';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.UpdatingProductsDueToHierarchy1743630901894 = UpdatingProductsDueToHierarchy1743630901894;
//# sourceMappingURL=1743630901894-updating_products_due_to_hierarchy.js.map