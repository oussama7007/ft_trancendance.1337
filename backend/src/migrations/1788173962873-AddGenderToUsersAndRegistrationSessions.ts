
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGenderToUsersAndRegistrationSessions1788173962873
  implements MigrationInterface
{
  name =
    'AddGenderToUsersAndRegistrationSessions1788173962873';

  public async up(queryRunner: QueryRunner): Promise<void> {
    /*
     * Add gender to users.
     *
     * Existing users need a value, so we temporarily use
     * "unknown" as the default.
     */
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD "gender" character varying NOT NULL DEFAULT 'unknown'
    `);

    /*
     * Add gender to registration sessions.
     *
     * Existing registration sessions also need a value.
     */
    await queryRunner.query(`
      ALTER TABLE "registration_sessions"
      ADD "gender" character varying NOT NULL DEFAULT 'unknown'
    `);

    /*
     * Increase the allowed length of user_contacts.type
     * from varchar(10) to varchar(20).
     *
     * IMPORTANT:
     * We do NOT drop the column because existing data such as
     * "phone" and "email" must be preserved.
     */
    await queryRunner.query(`
      ALTER TABLE "user_contacts"
      ALTER COLUMN "type" TYPE character varying(20)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /*
     * Restore user_contacts.type to varchar(10).
     */
    await queryRunner.query(`
      ALTER TABLE "user_contacts"
      ALTER COLUMN "type" TYPE character varying(10)
    `);

    /*
     * Remove gender from registration sessions.
     */
    await queryRunner.query(`
      ALTER TABLE "registration_sessions"
      DROP COLUMN "gender"
    `);

    /*
     * Remove gender from users.
     */
    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN "gender"
    `);
  }
}
