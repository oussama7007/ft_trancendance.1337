import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateListings1787141293458 implements MigrationInterface {
    name = 'CreateListings1787141293458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "listing_translations" ("id" SERIAL NOT NULL, "listingId" integer NOT NULL, "language" character varying(2) NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "UQ_cb88b9c17472aa9b47c568acf94" UNIQUE ("listingId", "language"), CONSTRAINT "PK_857943ae13a7cd3c39b9d9ba862" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "listings" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "bedrooms" integer NOT NULL, "hasWifi" boolean NOT NULL, "imageUrl" character varying NOT NULL, "city" character varying NOT NULL, "cityEnFr" character varying NOT NULL, "district" character varying NOT NULL, "districtEnFr" character varying NOT NULL, "ownerName" character varying, "ownerId" integer, "lat" double precision, "lng" double precision, CONSTRAINT "PK_520ecac6c99ec90bcf5a603cdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "listing_translations" ADD CONSTRAINT "FK_482aa14b37b0becf9237121a3c5" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listing_translations" DROP CONSTRAINT "FK_482aa14b37b0becf9237121a3c5"`);
        await queryRunner.query(`DROP TABLE "listings"`);
        await queryRunner.query(`DROP TABLE "listing_translations"`);
    }

}
