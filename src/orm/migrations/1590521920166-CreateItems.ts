import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateItems1590521920166 implements MigrationInterface {
  name = 'CreateItems1590521920166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "items" ("id" SERIAL NOT NULL,"name" character varying(100) NOT NULL, "price" int NOT NULL,"duration" int NOT NULL,"end_at" TIMESTAMP NOT NULL DEFAULT now() , "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(),PRIMARY KEY ("id"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "items"`, undefined);
  }
}
