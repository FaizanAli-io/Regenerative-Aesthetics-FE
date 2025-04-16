"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTblWishlistsItems1743193069378 = void 0;
class AddTblWishlistsItems1743193069378 {
    name = 'AddTblWishlistsItems1743193069378';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "wishlist_items" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "product_id" integer, CONSTRAINT "PK_0bd52924a97cda208ed2a07bd69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wishlist_items" ADD CONSTRAINT "FK_549f44d8b756e2690deb099f83b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist_items" ADD CONSTRAINT "FK_177397e044732e7e9c0215cd5b7" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "wishlist_items" DROP CONSTRAINT "FK_177397e044732e7e9c0215cd5b7"`);
        await queryRunner.query(`ALTER TABLE "wishlist_items" DROP CONSTRAINT "FK_549f44d8b756e2690deb099f83b"`);
        await queryRunner.query(`DROP TABLE "wishlist_items"`);
    }
}
exports.AddTblWishlistsItems1743193069378 = AddTblWishlistsItems1743193069378;
//# sourceMappingURL=1743193069378-add_tbl_wishlists_items.js.map