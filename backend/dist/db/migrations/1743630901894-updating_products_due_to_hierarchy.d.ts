import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdatingProductsDueToHierarchy1743630901894 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
