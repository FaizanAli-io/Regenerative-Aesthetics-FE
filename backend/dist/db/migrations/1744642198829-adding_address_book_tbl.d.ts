import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddingAddressBookTbl1744642198829 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
