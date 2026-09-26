import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateArticleTable1789792353934 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
