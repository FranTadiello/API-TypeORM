import { MigrationInterface, QueryRunner } from "typeorm";

export class MinhaMigration1751576366481 implements MigrationInterface {
    name = 'MinhaMigration1751576366481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "idade" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "idade"`);
    }

}
