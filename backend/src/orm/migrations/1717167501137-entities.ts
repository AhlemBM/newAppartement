import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1717167501137 implements MigrationInterface {
    name = 'Entities1717167501137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`checkins\` ADD \`prix_nuit\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`checkins\` DROP COLUMN \`prix_nuit\``);
    }

}
