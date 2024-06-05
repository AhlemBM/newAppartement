import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1717165168554 implements MigrationInterface {
    name = 'Entities1717165168554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`checkins\` DROP COLUMN \`frais_menage\``);
        await queryRunner.query(`ALTER TABLE \`checkins\` ADD \`nom_client\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`checkins\` ADD \`date_debut\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`checkins\` ADD \`nombre_nuits\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`checkins\` ADD \`prix_total\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`checkins\` DROP COLUMN \`prix_total\``);
        await queryRunner.query(`ALTER TABLE \`checkins\` DROP COLUMN \`nombre_nuits\``);
        await queryRunner.query(`ALTER TABLE \`checkins\` DROP COLUMN \`date_debut\``);
        await queryRunner.query(`ALTER TABLE \`checkins\` DROP COLUMN \`nom_client\``);
        await queryRunner.query(`ALTER TABLE \`checkins\` ADD \`frais_menage\` int NOT NULL DEFAULT '0'`);
    }

}
