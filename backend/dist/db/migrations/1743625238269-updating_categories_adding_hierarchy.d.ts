import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdatingCategoriesAddingHierarchy1743625238269 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
