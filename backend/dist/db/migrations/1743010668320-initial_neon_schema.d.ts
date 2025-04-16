import { MigrationInterface, QueryRunner } from "typeorm";
export declare class InitialNeonSchema1743010668320 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
