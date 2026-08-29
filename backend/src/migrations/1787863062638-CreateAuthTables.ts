import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthTables1787863062638 implements MigrationInterface {
    name = 'CreateAuthTables1787863062638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_contacts" ("id" SERIAL NOT NULL, "type" character varying(10) NOT NULL, "value" character varying NOT NULL, "verifiedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "UQ_a01b6ce691009c441caf705bccb" UNIQUE ("type", "value"), CONSTRAINT "PK_c7048d25b5fda1fa70501fac9ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "dateOfBirth" date NOT NULL, "passwordHash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "cin" character varying, CONSTRAINT "UQ_9b4e53aca6ef6552d5ce3d51a35" UNIQUE ("cin"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registration_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "dateOfBirth" date NOT NULL, "cin" character varying, "expiresAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1b0df4cab2bdfc9ef73911ea763" UNIQUE ("cin"), CONSTRAINT "PK_dd3fbb2318aa0d5c69308f21f3c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "verification_challenges" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "registrationSessionId" character varying NOT NULL, "type" character varying NOT NULL, "destination" character varying NOT NULL, "codeHash" character varying NOT NULL, "attempts" integer NOT NULL DEFAULT '0', "expiresAt" TIMESTAMP NOT NULL, "verifiedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a32154d92462ede7fa3879002b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "listings" DROP COLUMN "ownerName"`);
        await queryRunner.query(`ALTER TABLE "user_contacts" ADD CONSTRAINT "FK_30fcfbc780a02d200e0589b2886" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "listings" ADD CONSTRAINT "FK_c3dc0ba6b57c545899ab3187ea9" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listings" DROP CONSTRAINT "FK_c3dc0ba6b57c545899ab3187ea9"`);
        await queryRunner.query(`ALTER TABLE "user_contacts" DROP CONSTRAINT "FK_30fcfbc780a02d200e0589b2886"`);
        await queryRunner.query(`ALTER TABLE "listings" ADD "ownerName" character varying`);
        await queryRunner.query(`DROP TABLE "verification_challenges"`);
        await queryRunner.query(`DROP TABLE "registration_sessions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_contacts"`);
    }

}
