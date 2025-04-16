"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSignupVerification1743027275156 = void 0;
class UpdateUserSignupVerification1743027275156 {
    name = 'UpdateUserSignupVerification1743027275156';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "isVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "verificationToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "verificationTokenExpires" TIMESTAMP`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verificationTokenExpires"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verificationToken"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isVerified"`);
    }
}
exports.UpdateUserSignupVerification1743027275156 = UpdateUserSignupVerification1743027275156;
//# sourceMappingURL=1743027275156-update_user_signup_verification.js.map