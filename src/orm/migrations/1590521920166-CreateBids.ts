import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBids1590521920166 implements MigrationInterface {
  name = 'CreateBids1590521920166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bids" ("id" SERIAL NOT NULL,"user_id" int NOT NULL, "item_id" int NOT NULL,"price" int NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(),PRIMARY KEY ("id"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "bids"`, undefined);
  }
}
