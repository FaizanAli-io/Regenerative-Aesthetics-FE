import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdatingDbFks1743797872518 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
