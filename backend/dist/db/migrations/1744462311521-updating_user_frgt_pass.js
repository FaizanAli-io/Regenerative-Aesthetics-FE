"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatingUserFrgtPass1744462311521 = void 0;
class UpdatingUserFrgtPass1744462311521 {
    name = 'UpdatingUserFrgtPass1744462311521';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "resetPasswordToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "resetPasswordTokenExpires" TIMESTAMP`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "resetPasswordTokenExpires"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "resetPasswordToken"`);
    }
}
exports.UpdatingUserFrgtPass1744462311521 = UpdatingUserFrgtPass1744462311521;
//# sourceMappingURL=1744462311521-updating_user_frgt_pass.js.map