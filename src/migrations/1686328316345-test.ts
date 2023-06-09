import { MigrationInterface, QueryRunner } from "typeorm"

export class Test1686328316345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      ALTER TABLE airLineType
      ADD COLUMN "user" uuid
    `);

    await queryRunner.query(`
      ALTER TABLE airLineType
      ADD CONSTRAINT "FK_user"
      FOREIGN KEY ("user")
      REFERENCES "user" (id)
      ON DELETE CASCADE
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      ALTER TABLE airLineType
      DROP CONSTRAINT "FK_user"
    `);

    await queryRunner.query(`
      ALTER TABLE airLineType
      DROP COLUMN "user"
    `);
    }

}
