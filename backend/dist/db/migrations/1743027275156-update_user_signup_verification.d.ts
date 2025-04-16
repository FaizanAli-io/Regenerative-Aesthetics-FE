import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateUserSignupVerification1743027275156 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
